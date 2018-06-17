import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';
import {
    Styles
} from './Styles';
import MobileIcon30 from './Old-Mobile-icon-30.png'
import Detailview from './Detailview';
import Countly from './Countly';
import TestPage from './TestPage';
import ArrowComponent from 'react-native-zindex-views';
const commonHtml = "<p>Here I am</p>";

export default class BodyArticle extends Component {

    render() {
        return ( 
            <View style = {Styles.BodyArticle}>
                {/*< View style = {
                    {
                        height: 108,
                        zIndex: 1,
                    }
                } >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Test')}>
                    <Image source = {MobileIcon30}/>
            </TouchableOpacity>
            </View> */}
                {/*<View style = {{height: 108,}}>*/}
                    <WebView source = {{html: commonHtml}}/> 
                {/*</View>*/}
            </View>
        );
    }
}

