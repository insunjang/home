import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';


const {height, width} = Dimensions.get('window');

export default class Popup extends Component {
    
    render() {
        return ( <View style = {styles.container} >
                    <View style = {{flex:1,position:'absolute', justifyContent:'flex-start',width:'100%',height:'100%', paddingTop:22,}}>
                        <Text style={{fontSize:11,height:19}}>익명설정</Text>
                    </View>
                    {/*<View style = {{flex:1,position:'absolute',width:'100%',height:12,paddingTop:41,}}/>*/}
                    <View style = {{flex:1,position:'absolute', justifyContent:'flex-start',width:'100%',height:'100%',paddingTop:53,}}>
                        <Text style={{fontSize:11}}>어디에도 작성자 정보가 저장되지 않습니다</Text>
                    </View>
                    < View style = {{height:1,backgroundColor:'#ebebeb',}} />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        position:'absolute',
        height: 200,
        width: 310,
        paddingLeft:22,
        paddingRight: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', 
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
