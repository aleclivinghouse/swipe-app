import React, { Component } from 'react';
import { Container, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as firebase from 'firebase';
import { Image } from 'react-native';
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';

class CreateProfile extends Component {
    constructor () {
      super()
      this.state = {
       my_pic: ''
    }
    this.getImage()
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
     let result = await ImagePicker.launchImageLibraryAsync({
       // allowsEditing: true,
       // aspect: [4, 3],
       base64: true
     });
       const imagesRef = firebase.storage().ref('/images')
     imagesRef.child('my_pic.jpg').putString(result.base64, 'base64').then(snapshot => {
         console.log("uploaded image!")
     })
   }
   getImage(){
   firebase.storage().ref('/images').child('my_pic.jpg').getDownloadURL().then((url) => {
     console.log('this is line 31');
     console.log(url);
     this.state.my_pic = url
     this.setState(this.state)
   })
 }


  render(){
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Input />
          <Button
          onPress={this._pickImage}
          title="Upload Image" color="#841584"
          >
          <Text>Upload</Text>
          </Button>
         <Image source={{ uri: this.state.my_pic }} style={{ width: 200, height: 200 }} />
        </Content>

        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

export default CreateProfile;
