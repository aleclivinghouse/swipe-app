import * as firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';

import {
  MESSAGE_CREATE,
  MESSAGE_FETCH,
  MESSAGE_DELETE
} from './types';

export const messageCreate = (text, userId, chatId) => {
  return (dispatch) => {
    const firestore = firebase.firestore();
    const chat = firestore.collection('GroupChat').doc(chatId)
    chat.collection('messages').doc().set({text: text, userId: userId})
     .then(() => Actions.Main())
  }
}
