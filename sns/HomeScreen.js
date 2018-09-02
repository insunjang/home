import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter,
    FlatList
} from 'react-native';

import {
    createStackNavigator,
} from 'react-navigation';
import HomeScreenListItem from './HomeScreenListItem';

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
            id:'0',
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

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    }

    componentWillMount() {

            DeviceEventEmitter.addListener('MSREventBridgeModuleEvent', this.goToDetail);
    }

    componentWillUnmount() {
            DeviceEventEmitter.removeListener('MSREventBridgeModuleEvent');
    }

    goToDetail = () => {
        console.log('############reciedved event from native')
        this.props.navigation.navigate('Details')
    }

    state = {
        selected: (new Map() ),
        listDatas:[]
    };

    componentDidMount(){
        
    }

    makeDetailList = () => {
        let listDatas = [];
        listDatas.push(...data)
        listDatas.push(...commentlist)
        this.setState({
            listDatas: listDatas,
            title: this.props.navigation.state.params.title
        })
        console.log('detaillistDatas', this.state.detaillistDatas)
    }


    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id, index) => {
        // updater functions are preferred for transactional updates
        this.props.navigation.navigate('Details', {index:index, title: data[index].title})
        /*this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {
                selected
            };
        });*/


    };

    _renderItem = ({item, index}) => {
     return (<HomeScreenListItem 
        id = {item.id}
        index = {index}
        onPressItem = {this._onPressItem}
        selected = {!!this.state.selected.get(item.id)}
        title = {item.title}
        />)
    }

    render() {
        return ( <View style = {styles.container} >
                < FlatList
                    ref={ref => this.homeflatList = ref}
                    initialNumToRender = {data.length}
                    data = {[...data]}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
