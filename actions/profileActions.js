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
    return async (dispatch) => {
      //we have to get the user then attach all their pictures

      const userId = firebase.auth().currentUser.uid;
      const firestore = firebase.firestore();
      const profileRef = await firestore.collection('users').doc(userId).collection('profile').get();
      let userArr = [];
      for(let doc of profileRef.docs){
        let map = {};
        map.id =doc.id;
        map.data = doc.data();
        userArr.push(map);
      }
      console.log('this is the user arr async await', userArr);
      for(let user of userArr){
        user.pics = [];
        let pictureRef = await firestore.collection('users').doc(user.id).collection('profile').doc(user.id).collection('pictures').get();
        console.log('this is the picture ref', pictureRef);
        for(let doc of pictureRef.docs){
          let map = {};
          map.id =doc.id;
          map.data = doc.data();
          user.pics.push(map);
        }
      }
      console.log('this is the user with pics arr async await', userArr);
      dispatch({type: USER_PROFILE_FETCH, payload: userArr[0]});
      // }).then((userArr) => {
      //   for(let user of userArr){
      //     user.pics = [];
      //     console.log('this is the user ', user);
      //     let pictureRef = firestore.collection('users').doc(user.id).collection('profile').doc(user.id).collection('pictures');
      //     pictureRef.get().then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         let map = {};
      //         map.id =doc.id;
      //         map.data = doc.data();
      //         user.pics.push(map);
      //         console.log('user.pics', user.pics);
      //       });
      //     })
      //   }
      //   return userArr;
      // }).then((userArr) =>{
      //   console.log('this is the userArr before dispatch', userArr);
      //   dispatch({type: USER_PROFILE_FETCH, payload: userArr[0]});
      // })
    }
  }


  // export const fetchSwipeUsers = () => {
  //   return(dispatch) => {
  //
  //   }
  // }
