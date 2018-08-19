import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter
} from 'react-native';

import {
    createStackNavigator,
} from 'react-navigation';


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

    
    render() {
        return ( <View style = {styles.container} >
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Details')} >
                <Text style = {styles.welcome} >
                Welcome to React Native!
                </Text> 
            </TouchableOpacity> 
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
