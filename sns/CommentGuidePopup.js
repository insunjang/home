import React, {
    Component
} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import {Styles} from './Styles';

export default class CommentGuidePopup extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {name, hideCommentGuidPopup} = this.props
            return ( 
                < View style = {Styles.commentGuidePopup} >
                    <View style={{position:'absolute',paddingLeft:15,justifyContent:'center',alignItems:'flex-start',width:'100%',height:'100%'}}>
                        <Text style ={{fontSize:11,color:'#969696' }} >
                        {name}님에게 답글달기
                        </Text>
                    </View>
                    <View style = {{position:'absolute',paddingRight:15, width:'100%',height:'100%',justifyContent:'center',alignItems:'flex-end' }} >
                        < TouchableOpacity onPress = {
                            () => hideCommentGuidPopup()
                        }>
                        <Text style ={{fontSize:11,color:'#969696' }} >
                            닫기
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        }
        
}

