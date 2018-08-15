// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Client, Client4} from 'mattermost-redux/client';

import Loading from 'app/components/loading';
import {stripTrailingSlashes} from 'app/utils/url';
import tracker from 'app/utils/time_tracker';

import {preventDoubleTap} from 'app/utils/tap';
import {ViewTypes} from 'app/constants';
import FormattedText from 'app/components/formatted_text';
//import {injectIntl, intlShape} from 'react-intl';
import mattermostManaged from 'app/mattermost_managed';

export default class Root extends Component {
    static propTypes = {
        actions: PropTypes.shape({
            loadMe: PropTypes.func.isRequired
        }).isRequired,
        allowOtherServers: PropTypes.bool,
        userId: PropTypes.string.isRequired,
        epId: PropTypes.string.isRequired,
        baseUrl: PropTypes.string.isRequired,
        ssoUrl: PropTypes.string.isRequired,
        currentUser: PropTypes.object,
        credentials: PropTypes.object,
        justInit: PropTypes.bool,
        navigator: PropTypes.object,
        theme: PropTypes.object
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.credentials !== this.props.credentials) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        if (!this.props.justInit) {
            this.loadStoreAndScene();
        }
    }

    goToLoadTeam = () => {
        const {navigator, theme} = this.props;
        tracker.initialLoad = Date.now();
        navigator.resetTo({
            screen: 'LoadTeam',
            title: '',
            animated: true,
            animationType: 'fade',
            backButtonTitle: '',
            navigatorStyle: {
                statusBarHidden: false,
                statusBarHideWithNavBar: false,
                navBarTextColor: theme.sidebarHeaderTextColor,
                navBarBackgroundColor: theme.sidebarHeaderBg,
                navBarButtonColor: theme.sidebarHeaderTextColor,
                screenBackgroundColor: theme.centerChannelBg
            }
        });
    };

    goToSelectServer = () => {
        const {allowOtherServers, navigator} = this.props;

        navigator.resetTo({
            screen: 'SelectServer',
            animated: true,
            animationType: 'fade',
            navigatorStyle: {
                navBarHidden: true,
                navBarBackgroundColor: 'black',
                statusBarHidden: false,
                statusBarHideWithNavBar: false
            },
            passProps: {
                allowOtherServers
            }
        });
    };

    goToSSO = (ssoType) => {
        const {intl, navigator, theme, userId, epId, baseUrl, ssoUrl} = this.props;
        //const {userId, epId} = this.state;
        console.log('!!!!!!!!!!!!!!!!!!!!!!!goToSSO' );
        console.log('$$$$$$$$$$$$$userId : ' + userId + '   $$$$$$$$$$$$epId : ' + epId);
        navigator.resetTo({
            screen: 'SSO',
            //title: intl.formatMessage({id: 'mobile.routes.sso', defaultMessage: 'Single Sign-On'}),
            animated: true,
            backButtonTitle: '',
            navigatorStyle: {
                navBarTextColor: theme.sidebarHeaderTextColor,
                navBarBackgroundColor: theme.sidebarHeaderBg,
                navBarButtonColor: theme.sidebarHeaderTextColor,
                screenBackgroundColor: theme.centerChannelBg
            },
            passProps: {
                ssoType:ssoType,
                userId:userId,
                epId:epId,
                baseUrl:baseUrl,
                ssoUrl:ssoUrl,
            }
        });
    };

    loadStoreAndScene = () => {
        const {actions, currentUser, credentials} = this.props;
        const {loadMe} = actions;
        if (credentials.token && credentials.url) {
            Client.setToken(credentials.token);
            Client4.setToken(credentials.token);
            Client4.setUrl(stripTrailingSlashes(credentials.url));
            Client.setUrl(stripTrailingSlashes(credentials.url));

            if (currentUser) {
                loadMe();
                this.goToLoadTeam();
            } else {
                loadMe().then(this.goToLoadTeam).catch(this.goToLoadTeam);
            }
        } else {
              //preventDoubleTap(this.goToSSO, this, ViewTypes.SAML);
            this.goToSSO(ViewTypes.SAML);
            //this.goToSelectServer();
        }
    };

    render() {
        return <Loading/>;
    }
}
