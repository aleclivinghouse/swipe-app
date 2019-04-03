import React, { Component } from 'react';
import { Container, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as firebase from 'firebase';
import { Image } from 'react-native';
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';
// import RNFetchBlob from 'react-native-fetch-blob'



// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob
class CreateProfile extends Component {
      state = {
      image: null,
    };



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
     // console.log(result, 'result here')
     // this.uploadImage(result.uri).then(url => { alert('uploaded'); this.setState({image: url}) })
     //    .catch(error => console.log(error))
     // const name = (new Date()) + '-' + result.name;

     // const ref = firebase.storage().ref();
     // const metadata = { contentType: result.type };
     // const task = ref.child(name).put(result, metadata)
     // const theTask = dataURItoBlob(result.uri);
   }

   uploadImage(uri, mime = 'application/octet-stream') {
     console.log('this is the uri in upload image');
     console.log(uri);
     return new Promise((resolve, reject) => {
       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
       let uploadBlob = null
       const imageRef = firebase.storage().ref('images').child('image_001')

       fs.readFile(uploadUri, 'base64')
         .then((data) => {
           return Blob.build(data, { type: `${mime};BASE64` })
         })
         .then((blob) => {
           console.log('this is the blob', blob)
           uploadBlob = blob
           return imageRef.put(blob, { contentType: mime })
         })
         .then(() => {
           uploadBlob.close()
           return imageRef.getDownloadURL()
         })
         .then((url) => {
           resolve(url)
         })
         .catch((error) => {
           reject(error)
       })
     })
   }

  render(){
    let { image } = this.state;
    console.log('this is the image');
    console.log(image);
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
          {image &&
         <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
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
