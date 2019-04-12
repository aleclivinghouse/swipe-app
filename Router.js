import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './LoginForm';
import Chat from './Chat';
import ProfileForm from './ProfileForm';
import RegisterForm from './RegisterForm';
import ProfileFormWrapper from './ProfileFormWrapper';
import Pictures from './Pictures';
import Main from './Main';
import YourProfile from './YourProfile';
import Swipe from './Swipe';

const RouterComponent = () => {
  return(
    <Router>
      <Scene key="root" hideNavBar>
         <Scene key="LoginForm" component={LoginForm} title="" initial hideNavBar/>
           <Scene
              rightTitle="Add"
              key="Home"
              component={Main}
              title=""
              hideNavBar
             />
             <Scene
                rightTitle="Add"
                key="Pictures"
                component={Pictures}
                title=""
                hideNavBar
               />
               <Scene
                  key="Swipe"
                  component={Swipe}
                  title=""
                  hideNavBar
                 />
         <Scene
            rightTitle="Add"
            key="ProfileForm"
            component={ProfileFormWrapper}
            title=""
            hideNavBar
           />
           <Scene
              rightTitle="Add"
              key="RegisterForm"
              component={RegisterForm}
              title=""
              hideNavBar
             />
               <Scene
                  rightTitle="Add"
                  key="YourProfile"
                  component={YourProfile}
                  title=""
                  hideNavBar
                 />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
