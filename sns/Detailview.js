import React, {
    Component
} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';

import HeadArticle from './HeadArticle';
import BodyArticle from './BodyArticle';
import Icons from './Icons';
import CommentListitem from './CommentListitem';
import {
    Styles
} from './Styles';
import WaitingComments from './WaitingComments';
import CommentGuidePopup from './CommentGuidePopup';
import {
    KeyboardAwareScrollView,
    KeyboardAwareFlatList
} from 'react-native-keyboard-aware-scroll-view'
import {
    createStackNavigator
} from 'react-navigation';
import Swiper from './Swiper';
import SwiperFlatList from './SwiperFlatList';
import DetailviewContents from './DetailviewContents';
import DetailviewList from './DetailviewList';

export default class Detailview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            dataList: []
        }

        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.setState({
                    dataList: this.props.navigation.state.params.data,
                    index: this.props.navigation.state.params.index
                })

            }
        );
        this._renderItem = this._renderItem.bind(this)
    }

    static navigationOptions = {
        title: 'Detailview'
    }

    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            dataList: nextProps.data,
            index: tnextProps.index
        })
    }


    _renderItem = ({item,index}) => {
        if (this.state.index+1 >= index){
            const selectedItem = item;

            // Remember that the list is rendered with item 0 at the bottom so the "previous" post
            // comes after this one in the list
            const previousItem = index > 0 ? this.state.dataList[index - 1] : null;
            const nextItem = index < this.state.dataList.length - 1 ? this.state.dataList[index + 1] : null;

            return <DetailviewList
            //index = {index}
            item = {item}
            previousItem = {previousItem}
            nextItem = {nextItem}
            title = {this.props.navigation.state.params.title}
            />       
        }else{
            return
        }

    }

    getVisiblePostIds = (props) => {
        //return props.postIds.slice(0, 3);
    };

    loadMorePosts = () => {
        if (this.state.showLoadMore) {
            const {
                actions,
                channelId
            } = this.props;
            //actions.increasePostVisibility(channelId);
        }
    };

    getData = () => {
        let listDatas = [];

        listDatas.push(this.props.navigation.state.params.data[this.props.navigation.state.params.index - 1])
        listDatas.push(this.props.navigation.state.params.data[this.props.navigation.state.params.index])
        listDatas.push(this.props.navigation.state.params.data[this.props.navigation.state.params.index + 1])
    }

    render() {
        return ( 
        <View style = {[Styles.container]}>
            <SwiperFlatList 
            data = {this.state.dataList}
            index = {this.state.index}
            renderItem = {this._renderItem}
            //renderAll = {true}
            //extraData={this.makeExtraData(channelId, highlightPostId)}
            initialNumToRender = {1}
            keyExtractor = {this._keyExtractor}
            //onEndReached={loadMore}
            //onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
            //onScrollToIndexFailed={this.scrollListFailed}
            /> 
        </View>

        );
    }
}