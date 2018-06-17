import React, {
    Component
} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    WebView
} from 'react-native';

import HeadArticle from './HeadArticle';
import BodyArticle from './BodyArticle';
import Icons from './Icons';
import CommentListitem from './CommentListitem';
import {Styles} from './Styles';
import WaitingComments from './WaitingComments';
//import App from './App';

const CONTENTINFO = "CONTENTINFO";
const CONTENTBODY = "CONTENTBODY";
const ICONS = "ICONS";
const COMMENTLISTITEM = "COMMENTLISTITEM";


const defaultState = {
    elements: [
        {
            name: "Charil",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil2",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
        {
            name: "Charil3",
            comment: "exploit proactive functionalities",
            time: "29/10/2016"
        },
    ]
};

export default class Detailview extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props
        console.log('Detailview navigation', navigation)

        this.state={
            detaillistDatas:[],
            navi: navigation
        }
                console.log('Detailview this.state.navi', this.state.navi)

    }

    static navigationOptions = {
        title: 'Detailview',
    }

    componentWillMount(){
        this.setState({
            detaillistDatas:[]
        })
    }

    componentDidMount(){
        this.makeDetailList();
    }

    makeDetailList = () =>{
        let contentsInfoDatas = [/*{key:CONTENTINFO},{key:CONTENTBODY},{key:ICONS}*/]
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

    _renderItem({item}) {
        console.log('Detailview  _renderItem navi', this.props.navigation)
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
                    navigation = {
                        this.props.navigation
                    }
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

    render() {
        const {detaillistDatas} = this.state
        const {name} = this.props
        const { navi } = this.state;
        console.log('Detailview  render navi', navi)

        console.log('render detaillistDatas', detaillistDatas)
        return ( 
            <View style = {Styles.container} >
            < FlatList
                data = {[...detaillistDatas]}
                horizontal={false}
                keyExtractor = {this._keyExtractor}
                renderItem = {
                    this._renderItem.bind(this)
                }
            />
            <WaitingComments name={name}/>
            </View>
        );
    }
}

