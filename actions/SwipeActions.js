import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';

import {
  SWIPE_LEFT,
  SWIPE_RIGHT
} from './types';

export const swipeLeft = (swipedId) => {
  return async (disptach) => {
    const userId = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const swipeRef = firestore.collection('users').doc(userId).collection('alreadySwiped')
    swipeRef.add(swipedId)
  }
}


export const  swipeRight = (swipedId) => {
  return async (dispatch) => {
    //add the user id to the alreadySwiped arr
    const userId = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const userRef = firestore.collection('users');
    const swipeRef = firestore.collection('users').doc(userId).collection('alreadySwiped')

    //get all the docs where swiper
    let matchRef = await firestore.collection("matches").where("swiped", "==", userId).where("swiper", "==", swipedId).get();
    let flag = false;
    for(let doc of matchRef.docs){
      if(doc.exists){
      flag = true;
    }
  }

  if(flag !== true){
    swipeRef.add({user: swipedId})
    matchRef.add({swiper: userId, swiped: swipedId, approved: false})
  } else {
    let theMatchRef = firestore.collection("matches").where("swiped", "==", userId).where("swiper", "==", swipedId);
    theMatchRef.update({approved: true});
  }

  }//dispatch end
}
