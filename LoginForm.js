import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {loginUser} from './actions';

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
  this.props.loginUser(userData)
 }


  render() {
    return (
      <Container >
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
        </Content>
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
