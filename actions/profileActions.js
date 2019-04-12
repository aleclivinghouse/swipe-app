import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import {
  USER_PROFILE_FETCH,
  SWIPE_USERS_FETCH
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
      dispatch({type: USER_PROFILE_FETCH, payload: userArr[0]});
    }
  }

export const fetchSwipeUsers = () => {
    return async (dispatch) => {
          console.log('fetch in action fired');
          const userId = firebase.auth().currentUser.uid;
          const firestore = firebase.firestore();
          const userRef = await firestore.collection('users').get();
          let userArr = [];
          for(let doc of userRef.docs){
            let profileRef = await firestore.collection('users').doc(doc.id).collection('profile').get();
              for(let doc of profileRef.docs){
                let map = {};
                map.id =doc.id;
                map.data = doc.data();
                userArr.push(map);
              }
          }
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
          console.log('this is the userArr', userArr);
    } //end
}

      // for(let user of userArr){
      //   let pictureRef = await firestore.collection('users').doc().collection('profile').doc().collection('pictures').doc().get();
      //   for(let doc of pictureRef.docs){
      //     if(doc.id !== userId){
      //       let map = {};
      //       map.id =doc.id;
      //       map.data = doc.data();
      //       user.pics.push(map);
      //    }
      //   }
      // }
      // console.log('this is the user with pics arr async await', userArr);
      // dispatch({type: SWIPE_USERS_FETCH, payload: userArr});
  //   } //end
  // }
