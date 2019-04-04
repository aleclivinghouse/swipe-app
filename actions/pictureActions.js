import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';

import {
  PICTURE_CREATE,
  PICTURES_FETCH,
  PICTURE_DELETE
} from './types';

export const pictureCreate = (result) => {
  return (dispatch) => {
    let r = Math.random().toString(36).substring(7);
    firebase.storage().ref('/images').child(`${r}.jpg`).putString(result.base64, 'base64').then(snapshot => {
        console.log("uploaded image!")
        firebase.storage().ref('/images').child(`${r}.jpg`).getDownloadURL().then((url) => {
          console.log('this is firing');
          const userId = firebase.auth().currentUser.uid;
          const firestore = firebase.firestore();
          const profileRef = firestore.collection('users').doc(userId).collection('profile').doc(userId);
          profileRef.collection('pictures').add({url: url});

          profileRef.collection('pictures').where("url", "==", url).get().then((querySnapshot) => {
            querySnapshot.forEach((doc)=> {
              let map = {};
              map.data = doc.data();
              map.id = doc.id;
              console.log('this is the mao id', map.id);
              console.log('this is the doc data', doc.data())
              console.log('this is the picture', map.data)
              // return this.setState({ pictures: [...this.state.pictures, map]})
              dispatch({ type: PICTURE_CREATE, payload: map});
             });
          })
        })
    });
  }
}

export const picturesFetch = () => {
  return (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const profileRef = firestore.collection('users').doc(userId).collection('profile').doc(userId);
    profileRef.collection('pictures').get().then((querySnapshot) => {
      console.log('fetch pictures after query');
      let arr = [];
      querySnapshot.forEach((doc)=> {
        let map = {};
        map.data = doc.data();
        map.id = doc.id;
        arr.push(map);
        // console.log('this is the mao id', map.id);
        // console.log('this is the doc data', doc.data())
        // console.log('this is the picture', map.data)
       });
       console.log('this is the pictures arr ', arr);
       dispatch({ type: PICTURES_FETCH, payload: arr});
    })
  }
}
