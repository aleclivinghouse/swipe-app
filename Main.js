import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Container, Header, Footer, Content, Form, Item, Input, Label, Button, Left, Right, Icon, Body, FooterTab, Title } from 'native-base';

class Main extends Component {
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
