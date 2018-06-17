import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {Styles} from './Styles';
import {
    createStackNavigator
} from 'react-navigation';

export default class CommentListitem extends Component {

    constructor(props) {
            super(props);

                this.state = {
                onpressdLikeButton: false,
                onpressdUnlikeButton: false,
                unLikeCount:0,
                LikeCount:0,
            };
    }

    onpressCommentComments = () =>{
    }


    render() {
        const {navigation} = this.props
        console.log('navigation', navigation)
        const {name, comment, time,} = this.props
            return ( 
                < View style = {Styles.Comment} >
                    < View style = {{height:1,backgroundColor:'#ebebeb'}} />
                        <View style={{top:16, height:25, alignItems:'flex-start'}} >
                            <Text style={{color:'#000000',fontSize:13}}> {name} </Text>
                        </View>
                    < View style={{top:16, height:17, alignItems:'flex-start'}} >
                            <Text style={{color:'#000000',fontSize:13}}> {comment} </Text>
                    </View>
                    < View style = {{flex:1,paddingTop:20}} >
                        < View style = {{flexDirection:'row',justifyContent:'space-between'}} >
                            < View style = {{height:13,flexDirection:'row'}} >
                                <View>
                                    <Text style={{color:'#000000',fontSize:11}}> {time} </Text>
                                </View>
                                <View style={{width:12}}/>
                                    < TouchableOpacity onPress = {() => navigation.navigate('Popup')} >
                                        < View >
                                            <Text style={{color:'#000000',fontSize:11}}>답글달기 </Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
}

