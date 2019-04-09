
import {ADD_PROFILE, USER_PROFILE_FETCH} from '../actions/types';

const initialState = {
  userProfile: {},
  otherProfiles: []
};

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_PROFILE:
    return{
      ...state,
      userProfile: action.payload
    }
    case USER_PROFILE_FETCH:
    console.log('here is the action payload', action.payload);
    return{
      ...state,
      userProfile: action.payload
    }
    default:
      return state
  }
}
