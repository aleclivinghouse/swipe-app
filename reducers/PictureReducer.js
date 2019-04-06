
import {PICTURE_CREATE, PICTURES_FETCH, PICTURE_DELETE, PICTURE_ARRANGE} from '../actions/types';
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
    case PICTURE_DELETE:
    return {
      ...state,
      pictures: state.pictures.filter(item => item.id !== action.payload)
    }
    case PICTURE_ARRANGE:
    return {
      ...state,
      pictures: [
                ...state.pictures.filter(item => item.id === action.payload), 
                ...state.pictures.filter(item => item.id !== action.payload)
               ]
    }
    default:
      return state;
  }
};
