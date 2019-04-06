import React, {Component} from 'react';
import ProfileForm from './ProfileForm';

class ProfileFormWrapper extends Component{
  handleSubmit = values => {
    // console.log('these are the values' values);
    // let count = 0;
    // for(let value of values){
    //   if(value === true){
    //     count ++;
    //   }
   //  }
   //
   //  if(count !== 5){
   //    alert('please pick 5 checkboxes')
   //  } else {
   //  alert('here are the form values ' + values);
   // }
  }

  render(){
    return(
      <ProfileForm onSubmit={this.handleSubmit}/>
    );
  }
}

export default ProfileFormWrapper;
