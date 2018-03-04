import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux';
import {Header} from 'react-native-elements';

import {
  Text,
  View,
  SafeAreaView
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Home from './Home';
import Details from './Details';
import Favorites from './Favorites';


const Root = StackNavigator({
  Home: { screen: Home },
  Details: { screen: Details },
  Favorites: { screen: Favorites },
});

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
