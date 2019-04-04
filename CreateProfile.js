import React, { Component } from 'react';
import { Container, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { Image, View } from 'react-native';
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';
import {pictureCreate, picturesFetch, pictureDelete} from './actions';

class CreateProfile extends Component {
    constructor(){
      super()
  }

  componentWillMount(){
    this.props.picturesFetch()
  }

  onButtonPress(id){
      this.props.pictureDelete(id);
    }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
     let result = await ImagePicker.launchImageLibraryAsync({
       // allowsEditing: true,
       // aspect: [4, 3],
       base64: true
     });
     this.props.pictureCreate(result);
   }


  render(){
    console.log('these are the pics', this.props.pictures);
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
           <View style={{flex: 1}}>
          {
            this.props.pictures.map((item, index) => {
            return (
              <Content>
              <Image source={{uri: item.data.url }} style={{ width: 100, height: 100 }}/>
                <Button transparent
                  style={{marginTop: 20}}
                   onPress={this.onButtonPress.bind(this, item.id)}
                  >
                  <Text>Delete Pictures</Text>
                </Button>
              </Content>
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

const mapStateToProps = state => {
  console.log('this is mstp ', state);
  return {
  pictures: state.picture.pictures
  }
};

export default connect(mapStateToProps, {pictureCreate, picturesFetch, pictureDelete})(CreateProfile);
