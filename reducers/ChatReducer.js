

import {MESSAGE_CREATE, MESSAGE_FETCH, MESSAGE_DELETE} from '../actions/types';
const initialState = {
 messages: [],
};

export default (state = [], action) => {
  switch(action.type){
    case MESSAGE_CREATE:
      return {
       messages: [action.payload, ...state.messages]
      }
    default:
      return state;
  }
};
