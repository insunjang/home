import {StyleSheet, Dimensions} from 'react-native';
import { colors } from './colors';
import { horizontal, vertical, width, height } from './layout';
//const { width, height } = Dimensions.get('window');
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        //position: 'absolute',
        width: width,
        flexDirection: 'column',
    },
    HeadArticle: {
        //position: 'absolute',
        height: 128,
        backgroundColor: '#C5E1A5',
    },
    BodyArticle: {
        //position: 'absolute',
        height: 500,
    },
    Icons: {
        height: 85,
        backgroundColor: '#C5E1A5',
    },
    Comment: {
        //height: 98,
        width: width,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor: '#ffffff',
    },
    commentGuidePopup:{
        flexDirection:'row',
        height:33,
        width:'100%',
        backgroundColor:'#ebebeb'
    },
    WaitingComment:{
        height: 45,
        width:'100%',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        backgroundColor: 'transparent',
        //paddingLeft:15,
        //paddingBottom: 5
    },
    paginationContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginVertical: vertical.xxSmall,
        justifyContent: 'center',
        bottom: 0,
        left: width * 0.25,
        right: width * 0.25,
    },
    pagination: {
        width: horizontal.small,
        height: horizontal.small,
        borderRadius: 25,
        marginHorizontal: horizontal.xSmall,
    },

});