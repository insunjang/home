/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import Detailview from './Detailview';
import Countly from './Countly';
import TestPage from './TestPage';
import PopupBase from './PopupBase';



const RootStack = createStackNavigator(
  {
      Home: {
        screen: HomeScreen, 
      },
      Details: {
        screen: Detailview,
      },
      Popup: {
        screen: PopupBase,
      },
      Count: {
        screen: Countly,
      },

    },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends Component {
    render() {
      return <RootStack />
  }
}


