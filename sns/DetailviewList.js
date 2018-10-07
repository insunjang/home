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
import PageSwiper from './PageSwiper';


export default class DetailviewList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            dataList: []
        }
    }

    //_keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.getData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.item !== nextProps.item){
            this.getData(nextProps)
        }
    }


    _renderItem = ({item,index}) => {
        //const selectedItem = item;

        // Remember that the list is rendered with item 0 at the bottom so the "previous" post
        // comes after this one in the list
        //const previousItem = index < this.state.dataList.length - 1 ? this.state.dataList[index + 1] : null;
        //const nextItem = index > 0 ? this.state.dataList[index - 1] : null;

        return 
        <DetailviewContents
        index = {index}
        item = {item}
        //previousItem = {previousItem}
        //nextItem = {nextItem}
        //title = {this.props.navigation.state.params.title}
        />
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


    getData = (props) => {
        let listDatas = [];

        listDatas.push(props.previousItem)
        listDatas.push(props.item)
        listDatas.push(props.nextItem)
        this.setState({
            dataList: listDatas,
            item: props.item,
            previousItem: props.previousItem,
            nextItem: props.nextItem,
            index:1
            //index: this.props.navigation.state.params.index
        })

    }

    render() {
        return ( 
        <View style = {[Styles.container]}>
        {/*<DetailviewContents
        //index = {index}
        item = {this.props.item}
        />*/}

            {<PageSwiper>
                <View>
                    <Text style ={{color: '#fff',fontSize: 30,}}>Hello Swiper</Text>
                    {/*<DetailviewContents
                    item = {this.state.previousItem}
                    />*/}
                </View>
                <View>
                    <Text style ={{color: '#fff',fontSize: 30,}}>beatiful</Text>
                    {/*<DetailviewContents
                    item = {this.state.item}
                    />*/}
                </View>
                <View> 
                    <Text style ={{color: '#fff',fontSize: 30,}}>pretty</Text>
                    {/*<DetailviewContents
                    item = {this.state.nextItem}
                    />*/}
                </View>
            </PageSwiper>}
            {/*<SwiperFlatList 
            data = {this.state.dataList}
            index = {this.state.index}
            renderItem = {this._renderItem}
            renderAll = {true}
            //extraData={this.makeExtraData(channelId, highlightPostId)}
            //initialNumToRender = {1}
            //keyExtractor = {this._keyExtractor}
            //onEndReached={loadMore}
            //onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
            //onScrollToIndexFailed={this.scrollListFailed}
            />*/} 
        </View>

        );
    }
}