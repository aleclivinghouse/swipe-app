import React, {Component} from 'react';
import ProfileForm from './ProfileForm';

class ProfileFormWrapper extends Component{
  handleSubmit = values => {
    alert('here are the form values ' + values);
  }

  render(){
    return(
      <ProfileForm onSubmit={this.handleSubmit}/>
    );
  }
}

export default ProfileFormWrapper;
