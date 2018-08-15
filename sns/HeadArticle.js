import React, {
    Component
} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native';
import ArrowComponent from 'react-native-zindex-views';

import {Styles} from './Styles';
import MobileIcon30 from './Old-Mobile-icon-30.png'


export default class HeadArticle extends Component {
    render() {
        return ( 
            <View style = {Styles.HeadArticle} >
            
                < View style = {
                    {
                        top: 70,
                        right: 15,
                        position: 'absolute',
                        alignItems: 'flex-end'
                    }
                    } >
                    
                    < TouchableOpacity style = {
                            {
                            }
                            }
                            onPress = {
                                () => this.forceUpdate()
                            } >
                        <Image source = {MobileIcon30}/>
                        
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
