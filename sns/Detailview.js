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
import SwiperFlatList from './SwiperFlatList';
import DetailviewContents from './DetailviewContents';
import GestureRecognizer, {swipeDirections} from './GestureRecognizer';

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

        commentArr2 = [{
                name: "Chari11",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil12",
                comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil13",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil14",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil15",
                comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil16",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil17",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil18",
                comment: "exploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil19",
                comment: "exploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalitiesexploit proactive functionalities",
                time: "29/10/2016"
            },
            {
                name: "Charil20",
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
                comment: commentArr2,
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
                comment: commentArr2,
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
                comment: commentArr2,
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
                comment: commentArr2,
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
                comment: commentArr2,
                time: "29/10/2016"
            },

        ]

export default class Detailview extends Component {
    constructor(props) {
        super(props);

        this.state={
            index:0
        }
    }

    static navigationOptions = {
        title: 'Detailview',
    }

_renderItem = ({item,index}) => (
    <DetailviewContents
        //index = {this.props.navigation.state.params.index}
        //title = {this.props.navigation.state.params.title}
        index = {index}
        title = {item.title}

    />
  );

 _keyExtractor = (item, index) => item.id;

componentDidMount(){
    this.setState({index: this.props.navigation.state.params.index});
}
onSwipeUp(gestureState) {
    console.log('#########onSwipeUp')
    //this.setState({myText: 'You swiped up!'});
  }

onSwipeDown(gestureState) {
    console.log('#########onSwipeDown')
    //this.setState({myText: 'You swiped down!'});
  }

onSwipeLeft(gestureState) {
    console.log('#########onSwipeLeft')
    this.setState({index: this.state.index - 1});
  }

onSwipeRight(gestureState) {
    console.log('#########onSwipeRight')
    this.setState({index: this.state.index + 1});
  }

onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        //this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        //this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        //this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        //this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

render() {
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
console.log('###########index',this.state.index)
    return ( 
            <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeUp={(state) => this.onSwipeUp(state)}
            onSwipeDown={(state) => this.onSwipeDown(state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={{flex: 1,backgroundColor: this.state.backgroundColor}}
            >
                <View style = {[Styles.container]} >
                    <DetailviewContents
                    index = {this.state.index}
                    title = {this.props.navigation.state.params.title}
                    />
                </View>
            </GestureRecognizer>

    );
    }
}

