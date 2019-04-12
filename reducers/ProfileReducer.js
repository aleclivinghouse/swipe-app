
import {ADD_PROFILE, USER_PROFILE_FETCH, SWIPE_USERS_FETCH} from '../actions/types';

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
    return{
      ...state,
      userProfile: action.payload
    }
    case SWIPE_USERS_FETCH:
      console.log('here is the action payload', action.payload);
    return {
      ...state,
      otherProfiles: action.payload
    }
    default:
      return state
  }
}
