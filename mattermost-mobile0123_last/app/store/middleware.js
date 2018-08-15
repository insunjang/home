// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import DeviceInfo from 'react-native-device-info';

import {ChannelTypes, GeneralTypes, TeamTypes, UserTypes} from 'mattermost-redux/action_types';
import {General} from 'mattermost-redux/constants';
import {getTeammateNameDisplaySetting} from 'mattermost-redux/selectors/entities/preferences';
import {getUserIdFromChannelName, getGroupDisplayNameFromUserIds} from 'mattermost-redux/utils/channel_utils';
import {displayUsername} from 'mattermost-redux/utils/user_utils';

import {ViewTypes} from 'app/constants';
import initialState from 'app/initial_state';
import mattermostBucket from 'app/mattermost_bucket';
import Config from 'assets/config';

import {
    captureException,
    LOGGER_JAVASCRIPT_WARNING
} from 'app/utils/sentry';

export function messageRetention(store) {
    return (next) => (action) => {
        if (action.type === 'persist/REHYDRATE') {
            const {app} = action.payload;
            const {entities, views} = action.payload;

            if (!entities || !views) {
                return next(action);
            }

            // When a new version of the app has been detected
            if (!app || !app.version || app.version !== DeviceInfo.getVersion() || app.build !== DeviceInfo.getBuildNumber()) {
                return next(resetStateForNewVersion(action));
            }

            // Keep only the last 60 messages for the last 5 viewed channels in each team
            // and apply data retention on those posts if applies
            let nextAction;
            try {
                nextAction = cleanupState(action);
            } catch (e) {
                // Sometimes, the payload is incomplete so log the error to Sentry and skip the cleanup
                console.warn(e); // eslint-disable-line no-console
                captureException(e, LOGGER_JAVASCRIPT_WARNING, store);
                nextAction = action;
            }

            return next(nextAction);
        } else if (action.type === ViewTypes.DATA_CLEANUP) {
            const nextAction = cleanupState(action, true);
            return next(nextAction);
        }

        return next(action);
    };
}

function resetStateForNewVersion(action) {
    const {payload} = action;
    const lastChannelForTeam = getLastChannelForTeam(payload);

    let general = initialState.entities.general;
    if (payload.entities.general) {
        general = payload.entities.general;
    }

    let teams = initialState.entities.teams;
    if (payload.entities.teams) {
        teams = {
            currentTeamId: payload.entities.teams.currentTeamId,
            teams: payload.entities.teams.teams,
            myMembers: payload.entities.teams.myMembers
        };
    }

    let users = initialState.entities.users;
    if (payload.entities.users) {
        const currentUserId = payload.entities.users.currentUserId;
        if (currentUserId) {
            users = {
                currentUserId,
                profiles: {
                    [currentUserId]: payload.entities.users.profiles[currentUserId]
                }
            };
        }
    }

    let preferences = initialState.entities.preferences;
    if (payload.entities.preferences) {
        preferences = payload.entities.preferences;
    }

    let search = initialState.entities.search;
    if (payload.entities.search && payload.entities.search.recent) {
        search = {
            recent: payload.entities.search.recent
        };
    }

    let channelDrafts = initialState.views.channel.drafts;
    if (payload.views.channel && payload.views.channel.drafts) {
        channelDrafts = payload.views.channel.drafts;
    }

    let i18n = initialState.views.i18n;
    if (payload.views.i18n) {
        i18n = payload.views.i18n;
    }

    let fetchCache = initialState.views.fetchCache;
    if (payload.views.fetchCache) {
        fetchCache = payload.views.fetchCache;
    }

    let lastTeamId = initialState.views.team.lastTeamId;
    if (payload.views.team && payload.views.team.lastTeamId) {
        lastTeamId = payload.views.team.lastTeamId;
    }

    let threadDrafts = initialState.views.thread.drafts;
    if (payload.views.thread && payload.views.thread.drafts) {
        threadDrafts = payload.views.thread.drafts;
    }

    let selectServer = initialState.views.selectServer;
    if (payload.views.selectServer) {
        selectServer = payload.views.selectServer;
    }

    let recentEmojis = initialState.views.recentEmojis;
    if (payload.views.recentEmojis) {
        recentEmojis = payload.views.recentEmojis;
    }

    const nextState = {
        app: {
            build: DeviceInfo.getBuildNumber(),
            version: DeviceInfo.getVersion()
        },
        entities: {
            general,
            teams,
            users,
            preferences,
            search
        },
        views: {
            channel: {
                drafts: channelDrafts
            },
            i18n,
            fetchCache,
            team: {
                lastTeamId,
                lastChannelForTeam
            },
            thread: {
                drafts: threadDrafts
            },
            selectServer,
            recentEmojis
        }
    };

    return {
        type: action.type,
        payload: nextState,
        error: action.error
    };
}

function getLastChannelForTeam(payload) {
    const lastChannelForTeam = {...payload.views.team.lastChannelForTeam};
    const convertLastChannelForTeam = Object.values(lastChannelForTeam).some((value) => !Array.isArray(value));

    if (convertLastChannelForTeam) {
        Object.keys(lastChannelForTeam).forEach((id) => {
            lastChannelForTeam[id] = [lastChannelForTeam[id]];
        });
    }

    return lastChannelForTeam;
}

function cleanupState(action, keepCurrent = false) {
    const {payload: resetPayload} = resetStateForNewVersion(action);
    const {payload} = action;
    const {currentChannelId} = payload.entities.channels;

    const {lastChannelForTeam} = resetPayload.views.team;
    const nextEntitites = {
        posts: {
            posts: {},
            postsInChannel: {},
            reactions: {},
            openGraph: payload.entities.posts.openGraph,
            selectedPostId: payload.entities.posts.selectedPostId,
            currentFocusedPostId: payload.entities.posts.currentFocusedPostId
        },
        files: {
            files: {},
            fileIdsByPostId: {}
        }
    };

    let retentionPeriod = 0;
    if (resetPayload.entities.general && resetPayload.entities.general.dataRetentionPolicy &&
        resetPayload.entities.general.dataRetentionPolicy.message_deletion_enabled) {
        retentionPeriod = resetPayload.entities.general.dataRetentionPolicy.message_retention_cutoff;
    }

    const postIdsToKeep = Object.values(lastChannelForTeam).reduce((array, channelIds) => {
        const ids = channelIds.reduce((result, id) => {
            // we need to check that the channel id is not already included
            // the reason it can be included is cause at least one of the last channels viewed
            // in a team can be a DM or GM and the id can be duplicate
            if (!nextEntitites.posts.postsInChannel[id] && payload.entities.posts.postsInChannel[id]) {
                let postIds;
                if (keepCurrent && currentChannelId === id) {
                    postIds = payload.entities.posts.postsInChannel[id];
                } else {
                    postIds = payload.entities.posts.postsInChannel[id].slice(0, 60);
                }
                nextEntitites.posts.postsInChannel[id] = postIds;
                return result.concat(postIds);
            }

            return result;
        }, []);
        return array.concat(ids);
    }, []);

    let searchResults = [];
    if (payload.entities.search && payload.entities.search.results.length) {
        const {results} = payload.entities.search;
        searchResults = results;
        postIdsToKeep.push(...results);
    }

    postIdsToKeep.forEach((postId) => {
        const post = payload.entities.posts.posts[postId];

        if (post) {
            if (retentionPeriod && post.create_at < retentionPeriod) {
                const postsInChannel = nextEntitites.posts.postsInChannel[post.channel_id] || [];
                const index = postsInChannel.indexOf(postId);
                if (index !== -1) {
                    postsInChannel.splice(index, 1);
                }
                return;
            }

            nextEntitites.posts.posts[postId] = post;

            const reaction = payload.entities.posts.reactions[postId];
            if (reaction) {
                nextEntitites.posts.reactions[postId] = reaction;
            }

            const fileIds = payload.entities.files.fileIdsByPostId[postId];
            if (fileIds) {
                nextEntitites.files.fileIdsByPostId[postId] = fileIds;
                fileIds.forEach((fileId) => {
                    nextEntitites.files.files[fileId] = payload.entities.files.files[fileId];
                });
            }
        } else {
            // If the post is not in the store we need to remove it from the postsInChannel
            const channelIds = Object.keys(nextEntitites.posts.postsInChannel);
            for (let i = 0; i < channelIds.length; i++) {
                const channelId = channelIds[i];
                const posts = nextEntitites.posts.postsInChannel[channelId];
                const index = posts.indexOf(postId);
                if (index !== -1) {
                    posts.splice(index, 1);
                    break;
                }
            }
        }
    });

    const nextState = {
        app: resetPayload.app,
        entities: {
            ...nextEntitites,
            channels: payload.entities.channels,
            emojis: payload.entities.emojis,
            general: resetPayload.entities.general,
            preferences: resetPayload.entities.preferences,
            search: {
                ...resetPayload.entities.search,
                results: searchResults
            },
            teams: resetPayload.entities.teams,
            users: payload.entities.users
        },
        views: {
            ...resetPayload.views,
            channel: {
                ...resetPayload.views.channel,
                ...payload.views.channel
            }
        }
    };

    nextState.errors = payload.errors;

    return {
        type: 'persist/REHYDRATE',
        payload: nextState,
        error: action.error
    };
}

export function shareExtensionData(store) {
    return (next) => (action) => {
        // allow other middleware to do their things
        const nextAction = next(action);

        switch (action.type) {
        case 'persist/REHYDRATE': {
            const {entities} = action.payload;
            if (entities) {
                if (entities.general && entities.general.credentials && entities.general.credentials.token) {
                    mattermostBucket.set('credentials', JSON.stringify(entities.general.credentials), Config.AppGroupId);
                }

                if (entities.teams) {
                    const {currentTeamId, teams} = entities.teams;
                    if (currentTeamId) {
                        const team = teams[currentTeamId];
                        const teamToSave = {
                            id: currentTeamId,
                            name: team.name,
                            display_name: team.display_name
                        };
                        mattermostBucket.set('selectedTeam', JSON.stringify(teamToSave), Config.AppGroupId);
                    }
                }

                if (entities.users) {
                    const {currentUserId} = entities.users;
                    if (currentUserId) {
                        mattermostBucket.set('currentUserId', currentUserId, Config.AppGroupId);
                    }
                }
            }
            break;
        }
        case GeneralTypes.RECEIVED_APP_CREDENTIALS:
            mattermostBucket.set('credentials', JSON.stringify(action.data), Config.AppGroupId);
            break;
        case ChannelTypes.SELECT_CHANNEL: {
            const state = store.getState();
            const {channels} = state.entities.channels;
            const {currentUserId, profiles, profilesInChannel} = state.entities.users;
            const channel = {...channels[action.data]};
            if (channel.type === General.DM_CHANNEL) {
                const teammateId = getUserIdFromChannelName(currentUserId, channel.name);
                channel.display_name = displayUsername(profiles[teammateId], getTeammateNameDisplaySetting(state));
            } else if (channel.type === General.GM_CHANNEL) {
                channel.display_name = getGroupDisplayNameFromUserIds(
                    profilesInChannel[channel.id],
                    profiles,
                    currentUserId,
                    getTeammateNameDisplaySetting(state)
                );
            }

            const channelToSave = {
                id: channel.id,
                name: channel.name,
                display_name: channel.display_name,
                type: channel.type
            };
            mattermostBucket.set('selectedChannel', JSON.stringify(channelToSave), Config.AppGroupId);
            break;
        }
        case 'BATCH_SELECT_TEAM': {
            const teamData = action.payload.find((data) => data.type === TeamTypes.SELECT_TEAM);
            if (teamData && teamData.data) {
                const team = store.getState().entities.teams.teams[teamData.data];
                const teamToSave = {
                    id: team.id,
                    name: team.name,
                    display_name: team.display_name
                };
                mattermostBucket.set('selectedTeam', JSON.stringify(teamToSave), Config.AppGroupId);
            }
            break;
        }
        case UserTypes.RECEIVED_ME:
            mattermostBucket.set('currentUserId', action.data.id, Config.AppGroupId);
            break;
        case UserTypes.LOGOUT_SUCCESS:
            mattermostBucket.remove('credentials', Config.AppGroupId);
            mattermostBucket.remove('selectedChannel', Config.AppGroupId);
            mattermostBucket.remove('selectedTeam', Config.AppGroupId);
            mattermostBucket.remove('currentUserId', Config.AppGroupId);
            mattermostBucket.remove('emm', Config.AppGroupId);
            break;
        }
        return nextAction;
    };
}