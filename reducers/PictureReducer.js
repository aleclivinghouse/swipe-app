
import {PICTURE_CREATE, PICTURE_FETCH, PICTURE_DELETE} from '../actions/types';
const initialState = {
 pictures: [],
};

export default (state = [], action) => {
  switch(action.type){
    case PICTURE_CREATE:
      return {
       messages: [action.payload, ...state.pictures]
      }
    default:
      return state;
  }
};
