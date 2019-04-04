
import {PICTURE_CREATE, PICTURES_FETCH, PICTURE_DELETE} from '../actions/types';
const initialState = {
 pictures: [],
};

export default (state=initialState, action) => {
  switch(action.type){
    case PICTURE_CREATE:
      return {
      ...state,
       pictures: [action.payload, ...state.pictures]
      }
    case PICTURES_FETCH:
      return {
        ...state,
        pictures: action.payload
      }
    default:
      return state;
  }
};
