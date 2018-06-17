import React, {
    Component
} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import {Styles} from './Styles';
import {
    increament,
    decreament,
    zero
} from './Actions';
import instance from './TallyStore';

export default class Countly extends Component {

    constructor(props){
        super(props)

        this.state = {
            tally: instance.getTally()
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState() {
        this.setState({
            tally: instance.getTally()
        });
    }


    componentDidMount(){
       instance.addChangeListener(this.updateState)
    }

    componentWillUnmount(){
       instance.removeChangeListener(this.updateState)
    }

    render() {
        return ( 
            <View style = {styles.container}>
                <Text style={styles.appName}>
                    countly
                </Text>
                <Text style = {styles.totally}>
                    tally: {this.state.tally.count}
                </Text>
                < TouchableOpacity onPress = {increament} style = {styles.button} >
                    <Text style = {styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
                < TouchableOpacity onPress = {decreament} style = {styles.button}>
                    <Text style = {styles.buttonText}>
                        -
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={zero} style = {styles.button} >
                    < Text style={styles.buttonText}>
                        0
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

}


    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },
        appName: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        totally: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 20,
            fontSize: 25,
        },
        button: {
            backgroundColor: 'blue',
            width: 100,
            marginBottom: 20,
            padding:20,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
        },
    });