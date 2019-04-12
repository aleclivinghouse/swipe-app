import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Container, Header, Footer, Content, Form, Item, Input, Label, Button, Left, Right, Icon, Body, FooterTab, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
class Main extends Component {
  ViewProfile(){
    Actions.ProfileForm()
  }

  YourProfilePress(){
    Actions.YourProfile()
  }

  ImagePress(){
    Actions.Pictures()
  }
  SwipePress(){
    Actions.Swipe()
  }

  render(){
    return (
      <Container>
  <Header>
    <Left>
      <Button transparent onPress={this.YourProfilePress.bind(this)}>
        <Text>Your Profile</Text>
      </Button>
    </Left>
    <Body>
      <Title>Home</Title>
    </Body>
    <Right >
      <Button transparent onPress={this.SwipePress.bind(this)}>
        <Text>Swipe</Text>
      </Button>
    </Right >
  </Header>
  <Content>
    <Text>
      This is Content Section
    </Text>
    <Button full bordered info onPress={this.ImagePress.bind(this)}>
      <Text>Manage Images</Text>
    </Button>
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

export default Main;
