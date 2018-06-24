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


const CONTENTINFO = "CONTENTINFO";
const CONTENTBODY = "CONTENTBODY";
const ICONS = "ICONS";
const COMMENTLISTITEM = "COMMENTLISTITEM";
const {WIDTH, HEIGHT} = Dimensions.get('window')

const defaultState = {
    elements: [
        {
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
        }, {
            name: "Charil8",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        }, {
            name: "Charil9",
            comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
            time: "29/10/2016"
        }, {
            name: "Charil10",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },

    ]
};

export default class Detailview extends Component {
    constructor(props) {
        super(props);

        this.state={
            detaillistDatas:[],
            pressedAttachComment:false,
            name:'',
            focus:false,
            pressedIndex:0,
            itemHeight:0,
            onfocus: false
            //keyboardHeight:0,
            //keyboardSpace: 0
        }

    }

    static navigationOptions = {
        title: 'Detailview',
    }

    componentDidMount() {
        //this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
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

    makeDetailList = () =>{
        let contentsInfoDatas = [{key:CONTENTINFO},{key:CONTENTBODY},{key:ICONS}]
        let listDatas = [];
        let commentlist = [];

        commentlist.push(...defaultState.elements)
        commentlist.forEach((item, index, array) => {
            array[index].key = COMMENTLISTITEM});
        listDatas.push(...contentsInfoDatas)
        listDatas.push(...commentlist)
        this.setState({
            detaillistDatas: listDatas
        })
        console.log('detaillistDatas',this.state.detaillistDatas)
    }

    showCommentGuidePopup = (name,index) =>{ 
        this.setState({
            pressedAttachComment: true,
            name: name,
            pressedIndex: index,
            focus: true
        })
        console.log('showCommentGuidePopup index', index)

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
            return <HeadArticle/>
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
    //let {width, height} = event.nativeEvent.layout
    this.setState({
        touchedTextInput: true,
    })
    //console.log('itemHeight', height)
}

    render() {
        const {detaillistDatas,focus,pressedIndex} = this.state
        const {name} = this.props

        console.log('render detaillistDatas', detaillistDatas)
        console.log('render focus', focus)

        return ( 
            <View style = {[Styles.container]} >
            {/*<KeyboardAvoidingView behavior='padding' style={{ flex: 1}} onLayout={this._scrollEnd}>*/}
                < FlatList
                    ref={ref => this.flatList = ref}
                    initialNumToRender = {detaillistDatas.length}
                    data = {[...detaillistDatas]}
                    horizontal={false}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem.bind(this)}
                    //getItemLayout={this.getItemLayout}
                    //initialScrollIndex={0}
                    //onContentSizeChange = {this.onContentSizeChange}
                    onLayout = {this.onLayout}
                />
            {/*</KeyboardAvoidingView>*/}
            <View style = {{}}>
                {this.state.pressedAttachComment && <CommentGuidePopup name = {this.state.name}
                                                                    hideCommentGuidPopup={this.hideCommentGuidPopup} 
                                                                    />}
                <WaitingComments name={name}
                              focus={this.state.focus}
                              onFocus = {this.onFocus}
            />
            </View>

            </View>
        );
    }
}

