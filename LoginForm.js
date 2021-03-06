
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Content, Icon, Title, Body, Form, Item, Input, Label, Button, Left, Right, Footer, FooterTab } from 'native-base';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {loginUser} from './actions';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  constructor(props) {
  super(props);
  this.state = { email: '', password: '' };
}

  onButtonPress() {
    const userData = {
    email: this.state.email,
    password: this.state.password
  };
  this.props.loginUser(userData);
 }
 RegisterPress(){
   Actions.RegisterForm()
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
            <Title>Login</Title>
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
            onPress={this.RegisterPress.bind(this)}
            >
            <Text>Register</Text>
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

export default connect(mapStateToProps, { loginUser })(LoginForm);
