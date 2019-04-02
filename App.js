import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import 'firebase/firestore';
import LoginForm from './LoginForm';
import Router from './Router';

class App extends React.Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyAJKaDy95qBFdyo7JGlyKJ5dBebfaQNUeM",
      authDomain: "swipe-app-646be.firebaseapp.com",
      databaseURL: "https://swipe-app-646be.firebaseio.com",
      projectId: "swipe-app-646be",
      storageBucket: "swipe-app-646be.appspot.com",
      messagingSenderId: "77507712093"
    };
    firebase.initializeApp(config);
    firebase.firestore();
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <Router />
      </View>
    </Provider>
    );
  }
}

export default App;
