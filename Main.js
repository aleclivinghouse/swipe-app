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
    <Right />
  </Header>
  <Content>
    <Text>
      This is Content Section
    </Text>
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
