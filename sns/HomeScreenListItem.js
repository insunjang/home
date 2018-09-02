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

export default class HomeScreenListItem extends Component {

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
        const {id,index,title} = this.props
            return ( 
                < View style = {Styles.Comment} >
                    < View style = {{height:1,backgroundColor:'#ebebeb'}} />
                        < TouchableOpacity 
                            onPress = {() => this.props.onPressItem(id,index)}
                        >
                            <View style={{top:16, height:45, alignItems:'flex-start'}} >
                                <Text style={{color:'#000000',fontSize:13}}> {title} </Text>
                            </View>
                        </TouchableOpacity>
                </View>
            )
        }
}

