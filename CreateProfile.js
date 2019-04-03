import React, { Component } from 'react';
import { Container, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as firebase from 'firebase';
import { Image, View } from 'react-native';
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';

class CreateProfile extends Component {
    constructor(){
      super()
      this.state = {
       pictures: []
    };
    this.getImage()
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
     let result = await ImagePicker.launchImageLibraryAsync({
       // allowsEditing: true,
       // aspect: [4, 3],
       base64: true
     });
     let r = Math.random().toString(36).substring(7);
     //put the image in storage
     firebase.storage().ref('/images').child(`${r}.jpg`).putString(result.base64, 'base64').then(snapshot => {
         console.log("uploaded image!")
     })
     //put the downlaod url in firestore
     firebase.storage().ref('/images').child('my_pic.jpg').getDownloadURL().then((url) => {
       const userId = firebase.auth().currentUser.uid;
       const firestore = firebase.firestore();
       const userRef = firestore.collection('users').doc(userId);
       userRef.collection('profile').doc().set({picture: url});
     })
     this.getImage()
   }


   getImage(){
     const userId = firebase.auth().currentUser.uid;
     const firestore = firebase.firestore();
     const userRef = firestore.collection('users').doc(userId);
     userRef.collection('profile').get().then((querySnapshot) => {
       querySnapshot.forEach((doc)=> {
         console.log('this is the doc data', doc.data())
         return this.setState({ pictures: [...this.state.pictures, doc.data()]})
        });
     })
 }


  render(){
    console.log('these are the pics', this.state.pictures);
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
           <View style={{flex: 1}}>
          {
            this.state.pictures.map((item, index) => {
            return (
              <Image source={{uri: item.picture }} style={{ width: 200, height: 200 }}/>
            )})
          }
        </View>
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
