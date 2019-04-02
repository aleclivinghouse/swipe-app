import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './LoginForm';
import Main from './Main';
import Chat from './Chat';
import CreateProfile from './CreateProfile';

const RouterComponent = () => {
  return(
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
         <Scene key="login" component={LoginForm} title="Please Login" initial/>
         </Scene>
         <Scene key="main">
         <Scene
            rightTitle="Add"
            key="Main"
            component={CreateProfile}
            title=""
            initial
            hideNavBar
           />
         </ Scene>
      </Scene>
    </Router>
  );
}

export default RouterComponent;
