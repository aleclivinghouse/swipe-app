import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Footer, Content, Form, Item, Input, Label, Button, Left, Right, Icon, Body, FooterTab, Title } from 'native-base';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {registerUser} from './actions';
import { Actions } from 'react-native-router-flux';

class RegisterForm extends Component {
  constructor(props) {
  super(props);
  this.state = { email: '', password: '' };
}

  onButtonPress() {
    console.log('button press firing')
    const userData = {
    email: this.state.email.toLowerCase().trim(),
    password: this.state.password.trim()
  };
  console.log(userData.email, userData.password);
  this.props.registerUser(userData.email, userData.password)
 }
 LoginPress(){
   Actions.LoginForm()
 }


  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{flex: 1}} style={{padding: 20}}>
          <Form style={{alignItems: 'center'}}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                 onChangeText={(text) => this.setState({email: text})}
                 value={this.state.email}
                />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
              />
            </Item>
            <Button full bordered info
            style={{marginTop: 20}}
             onPress={this.onButtonPress.bind(this)}
             >
              <Text>Submit</Text>
            </Button>
          </Form>
          <Button full bordered info
            onPress={this.LoginPress.bind(this)}
            >
            <Text>Login</Text>
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
const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

export default connect(mapStateToProps, { registerUser })(RegisterForm);
