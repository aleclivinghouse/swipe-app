import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';

import {
  PICTURE_CREATE,
  PICTURE_FETCH,
  PICTURE_DELETE
} from './types';

export const picturesCreate = (text, userId, chatId) => {
  return (dispatch) => {
    const firestore = firebase.firestore();
    const chat = firestore.collection('GroupChat').doc(chatId)
    chat.collection('messages').doc().set({text: text, userId: userId})
     .then(() => Actions.Main())
  }
}
