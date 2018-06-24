import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';
import WaitingComments from './WaitingComments';

import {Styles} from './Styles';

const { dviceHeight, dviceWidth } = Dimensions.get('window')

export default class CommentListitem extends Component {

    constructor(props) {
            super(props);

            this.state = {
                heights: 38,
                //dimensions: undefined,
                onpressdLikeButton: false,
                onpressdUnlikeButton: false,
                unLikeCount:0,
                LikeCount:0,
            };
    }

    render() {
        const {name, comment, time, showCommentGuidePopup, index} = this.props
        console.log('item.index',this.props.index)
            return ( 
                < View style = {Styles.Comment} >
                    < View style = {{height:1,backgroundColor:'#ebebeb'}} />
                        <View style={{top:16, height:25, alignItems:'flex-start'}} >
                            <Text style={{color:'#000000',fontSize:13}}> {name} </Text>
                        </View>
                    < View style={{paddingTop:7, /*height:this.state.heights,*/ alignItems:'flex-start'}} >
                            <Text style={{color:'#000000',fontSize:13}} 
                                numberOfLines = {3}
                                ellipsizeMode ={'tail'}
                            > 
                            {comment} 
                            </Text>
                    </View>
                    < View style = {{flex:1,paddingTop:20}} >
                        < View style = {{flexDirection:'row',justifyContent:'space-between'}} >
                            < View style = {{height:13,flexDirection:'row'}} >
                                <View>
                                    <Text style={{color:'#000000',fontSize:11}}> {time} </Text>
                                </View>
                                <View style={{width:12}}/>
                                    < TouchableOpacity 
                                        onPress = {()=> showCommentGuidePopup(name,index)}

                                    >
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

