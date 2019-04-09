
import {ADD_PROFILE, USER_PROFILE_FETCH} from '../actions/types';

const initialState = {
  userProfile: {},
  otherProfiles: []
};

export default (state=initialState, action) => {
  console.log('here is the action payload', action.payload);
  switch(action.type){
    case ADD_PROFILE:
    return{
      ...state,
      userProfile: action.payload
    }
    case USER_PROFILE_FETCH:
    return{
      ...state,
      userProfile: action.payload[0]
    }
    default:
      return state
  }
}
