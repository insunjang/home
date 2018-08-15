import React, {
    Component
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';
import Popup from './Popup';

const {height, width} = Dimensions.get('window');

export default class PopupBase extends Component {
    
    render() {
        return ( <View style = {styles.container} >
        <Popup/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height: height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey', 
        //opacity: 0.5, 
        height: '100%'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
