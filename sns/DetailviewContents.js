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
import {Styles} from './Styles';
import WaitingComments from './WaitingComments';
import CommentGuidePopup from './CommentGuidePopup';
import { KeyboardAwareScrollView, KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator } from 'react-navigation';
import Swiper from './Swiper';

const CONTENTINFO = "CONTENTINFO";
const CONTENTBODY = "CONTENTBODY";
const ICONS = "ICONS";
const COMMENTLISTITEM = "COMMENTLISTITEM";
const {WIDTH, HEIGHT} = Dimensions.get('window')

    commentArr = [{
            name: "Charil",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil2",
            comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil3",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil4",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil5",
            comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil6",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil7",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil8",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil9",
            comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil10",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },

    ]


    const data = [{
                id: '0',
                title: "Article0",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '1',
                title: "Article1",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '2',
                title: "Article2",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '3',
                title: "Article3",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '4',
                title: "Article4",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '5',
                title: "Article5",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '6',
                title: "Article6",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '7',
                title: "Article7",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '8',
                title: "Article8",
                comment: commentArr,
                time: "29/10/2016"
            },
            {
                id: '9',
                title: "Article9",
                comment: commentArr,
                time: "29/10/2016"
            },

        ]

export default class DetailviewContents extends Component {
    constructor(props) {
        super(props);

        this.state={
            detaillistDatas:[],
            pressedAttachComment:false,
            name:'',
            focus:false,
            pressedIndex:0,
            itemHeight:0,
            onfocus: false,
            comment:'',
            title:''
        }

    }

    componentDidMount() {
        this.makeDetailList();
    }

    componentDidUpdate(){
        //this.flatList.scrollToIndex(0);
    }


    componentWillMount() {
        this.setState({
            detaillistDatas: []
        })
    }

    componentWillUnmount() {
        //this.keyboardDidShowListener.remove();
        //this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        alert('Keyboard Shown');
        this.setState({touchedTextInput: true})

    }

    _keyboardDidHide() {
        alert('Keyboard Hidden');
    }

    componentWillReceiveProps(){
               this.setState({
            title: this.props.title
               })
 
    }

    makeDetailList = () =>{
        let contentsInfoDatas = [{key:CONTENTINFO},{key:CONTENTBODY},{key:ICONS}]
        let listDatas = [];
        let commentlist = [];
        commentlist.push(...data[this.props.index].comment)
        commentlist.forEach((item, index, array) => {
            array[index].key = COMMENTLISTITEM});
        listDatas.push(...contentsInfoDatas)
        listDatas.push(...commentlist)
        this.setState({
            detaillistDatas: listDatas,
        })
        console.log('detaillistDatas',this.state.detaillistDatas)
    }

    showCommentGuidePopup = (name, index, comment) => {
        this.setState({
            pressedAttachComment: true,
            name: name,
            pressedIndex: index,
            comment: comment,
            focus: true
        })
    }

    hideCommentGuidPopup = () => {
        this.setState({
            pressedAttachComment: false,
            name: '',
            focus: false
        })
        this.hidekeyboard()
    }

    hidekeyboard = () => {
        Keyboard.dismiss()
    }

    _renderItem({item,index}) {

        switch (item.key) {
        case CONTENTINFO:
            return <HeadArticle
            //title = {this.props.title}
            />
        case CONTENTBODY:
            return <BodyArticle/>
        case ICONS:
            return <Icons/>
        case COMMENTLISTITEM:
            return <CommentListitem
                    name={item.name}
                    comment={item.comment}
                    time={item.time}
                    showCommentGuidePopup={this.showCommentGuidePopup}
                    index={index}

            />
        }
    }

    _keyExtractor = (item) => {
        switch(item.key){
            case CONTENTINFO:
            case CONTENTBODY:
            case ICONS:
                return item.key;
            case COMMENTLISTITEM:
                return item.name;
            }
    }

    getItemLayout = (data, index) => ({
        //const {height} = 
        length: HEIGHT,
        offset: HEIGHT * index,
        index
        
    });

    onFocus = () => {
        this.setState({onfocus:true});
    }

    onLayout = (event) => {
        if (this.state.pressedAttachComment && this.state.focus)
            this.flatList.scrollToIndex({animated:true, index:this.state.pressedIndex, viewPosition:1})
        else if (this.state.onfocus) {
            setTimeout(() =>{this.flatList.scrollToIndex({animated:true , index: this.state.detaillistDatas.length-1, viewPosition: 1})}  , 100);
        }
        else{
            if (this.flatList) {
                this.flatList.scrollToOffset({x:0, y: 0, animated: true});
            }
        }
}

onContentSizeChange = (event) => {
    this.setState({
        touchedTextInput: true,
    })
}

render() {
        const {detaillistDatas,focus,pressedIndex,name} = this.state
        return ( 
            <View /*style = {[Styles.container]}*/ >
                    <FlatList
                        ref={ref => this.flatList = ref}
                        initialNumToRender = {detaillistDatas.length}
                        data = {[...detaillistDatas]}
                        horizontal={false}
                        keyExtractor = {this._keyExtractor}
                        renderItem = {this._renderItem}
                        //getItemLayout={this.getItemLayout}
                        //onContentSizeChange = {this.onContentSizeChange}
                        //onLayout = {this.onLayout}
                    />
                    <View>
                        {this.state.pressedAttachComment && <CommentGuidePopup name = {this.state.name}
                                                                            hideCommentGuidPopup={this.hideCommentGuidPopup} 
                                                                            />}
                        <WaitingComments 
                                    name={name}
                                    focus={this.state.focus}
                                    onFocus = {this.onFocus}
                                    comment = {this.state.comment}
                    />
                    </View>
                </View>  
        );
    }
}

