import React, {
    Component
} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    WebView
} from 'react-native';

import HeadArticle from './HeadArticle';
import BodyArticle from './BodyArticle';
import CommentListitem from './CommentListitem';
import {Styles} from './Styles';

export default class Icons extends Component {
    render() {
        return ( 
            < View style = {Styles.Icons} >
            </View>
        );
    }
}
