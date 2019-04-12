import React, { Component } from 'react';
import { Container, Header, Title, Input, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { Image, View, Dimensions} from 'react-native';
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';
import {pictureCreate, picturesFetch, pictureDelete, pictureArrange} from './actions';
import { Actions } from 'react-native-router-flux';

class Pictures extends Component {
    constructor(){
      super()
  }

  componentWillMount(){
    this.props.picturesFetch()
  }

  onButtonPress(id){
      this.props.pictureDelete(id);
    }

  onArrangePress(id){
    this.props.pictureArrange(id)
  }

  onHomePress(){
    Actions.Home()
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
    var width = Dimensions.get('window').width;
    console.log('these are the pics', this.props.pictures);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent full bordered info onPress={this.onHomePress.bind(this)}>
              <Text>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title>Manage Pictures</Title>
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
             <Container>
             <Content>
          {
            this.props.pictures.map((item, index) => {
            return (
                <Card>
                  <Image source={{uri: item.data.url }} style={{height: 200}}/>
                <Button
                  style={{marginTop: 20, marginBottom: 20, flex: 1, alignSelf:'center'}}
                   onPress={this.onButtonPress.bind(this, item.id)}
                  >
                  <Text>Delete Picture</Text>
                </Button>
                <Button
                  style={{marginTop: 20, marginBottom: 20, flex: 1, alignSelf:'center'}}
                   onPress={this.onArrangePress.bind(this, item.id)}
                  >
                  <Text>Make Profile</Text>
                </Button>
               </Card>

            )})
          }
             </Content>
          </Container>
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

export default connect(mapStateToProps, {pictureCreate, picturesFetch, pictureDelete, pictureArrange})(Pictures);
