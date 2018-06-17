import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
}from 'react-native';



export default class TestPage extends Component {

    static navigationOptions = {
        title: 'TestPage',
    }

    render() {
            return ( 
            < View style = {styles.container} >
                <TextInput style={{height: 40,borderColor: 'gray', borderWidth: 1}} onChangeText={(text) => {
                    this.setState({inputText: text})}} value={this.state.inputText}/>
                <TouchableOpacity>
                    <Text>add Todo</Text>
                </TouchableOpacity>
            </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});