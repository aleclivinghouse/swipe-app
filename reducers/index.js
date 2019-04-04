import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import PictureReducer from './PictureReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  picture: PictureReducer,
})
