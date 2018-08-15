import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {
    createStackNavigator,
} from 'react-navigation';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
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
