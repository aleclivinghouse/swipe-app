import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import PictureReducer from './PictureReducer';
import ChatReducer from './ChatReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  picture: PictureReducer,
  form: formReducer
})
