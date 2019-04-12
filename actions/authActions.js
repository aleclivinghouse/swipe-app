import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER
} from './types';

export const emailChanged = (text) => {

  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => loginUserFail(dispatch));
  };
};

export const registerUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => registerUserSuccess(dispatch, user))
      .catch((error) => console.log('this is the error', error));
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  console.log('login user fail fired');
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.Home();
};


const registerUserSuccess = (dispatch, user) => {
  console.log('register user success fired');
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
  console.log('this is the user in success', user);
  const userId = firebase.auth().currentUser.uid;
  const firestore = firebase.firestore();
  firestore.collection('users').doc(userId).set({});
  Actions.ProfileForm();
};
