import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import {
  USER_PROFILE_FETCH
} from './types'

export const profileCreate = (values) => {
  return (dispatch) => {
    console.log('inital values', values);
    let categories = ['instrument', 'sports', 'fashion', 'children', 'straight-edge', 'visual-arts', 'outdoors', 'reading', 'political', 'fitness', 'technology', 'science'];
    for(let category of categories){
      let keys = Object.keys(values);
      if(!keys.includes(category)){
        values[category] = false;
      }
    }
    console.log('values after', values);
    console.log('profile action fired' );
    const userId = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const profileRef = firestore.collection('users').doc(userId).collection('profile').doc(userId);
    profileRef.set(values)
  }

}


  export const userProfileFetch = () => {
    return(dispatch) => {
      //we have to get the user then attach all their pictures

      const userId = firebase.auth().currentUser.uid;
      const firestore = firebase.firestore();
      const profileRef = firestore.collection('users').doc(userId).collection('profile');
      let userArr = [];

      profileRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let map = {};
          map.id =doc.id;
          map.data = doc.data();
          userArr.push(map);
        });
        for(let user of userArr){
          let picsArr = [];
          console.log('this is the user ', user);
          let pictureRef = firestore.collection('users').doc(user.id).collection('profile').doc(user.id).collection('pictures');
          pictureRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let map = {};
              map.id =doc.id;
              map.data = doc.data();
              picsArr.push(map);
            });
            user.pics = picsArr;
          })
        }
        console.log('this is the userArr before dispatch', userArr);
        dispatch({type: USER_PROFILE_FETCH, payload: userArr});
      });
    }
  }


  export fetchSwipeUsers = () => {
    return(dispatch) => {

    }
  }
