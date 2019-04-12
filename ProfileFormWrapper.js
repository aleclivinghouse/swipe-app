import React, {Component} from 'react';
import ProfileForm from './ProfileForm';
import {profileCreate} from './actions';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

class ProfileFormWrapper extends Component{
  handleSubmit = values => {
    alert('here are the form values ' + values);
    console.log('values', values);
    this.props.profileCreate(values);
    Actions.Home();
  }

  render(){
    return(
      <ProfileForm onSubmit={this.handleSubmit}/>
    );
  }
}

export default connect(null, {profileCreate})(ProfileFormWrapper);
