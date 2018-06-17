import {
    StyleSheet
} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        //zIndex: 2,
        //position: 'absolute',
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
        height: 98,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor: '#ffffff',
    },
    WaitingComment:{
        //height: 120,
        width:'100%',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        backgroundColor: 'transparent',
        //paddingLeft:15,
        //paddingBottom: 5


    }
});