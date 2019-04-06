import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import * as renders from './renderedComponents';

import { Field, reduxForm } from 'redux-form';

import {
Container,
Header,
Title,
Text,
Content,
Button,
Icon,
List,
ListItem,
Picker,
Left,
Right,
Body
} from 'native-base';

const validate = values => {
  const errors = {}
  if (!values.FirstName) {
    errors.FirstName = 'Required'
  }
  if (!values.LastName) {
    errors.LastName = 'Required'
  }
  return errors
}


class ProfileForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    goToHome() {
        this.props.navigator.push(Router.getRoute('TabbedHome'));
    }

    submitThenClear(data) {
        const { createRecord, reset } = this.props;
        return createRecord(data).then(() => {
            reset();
            // do other success stuff
            this.goToHome();
        });
    }
    render() {

        const { showPassword, handleSubmit, pristine, submitting, values, reset } = this.props;
        const Item = Picker.Item;
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
                <List>
                    <Field name="FirstName" placeholder="John" type="text" label="first name" component={renders.renderText} />
                    <Field name="LastName" placeholder="Doe" type="text" label="last name" component={renders.renderText} />
                    <Field name="vehiclePasswordTrigger" component={renders.renderCheckbox} label="Show / Hide Password" />

                    <Row>
                        <Col style={{width: 120, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{color: 'grey'}}> Type of Vehicle </Text>
                        </Col>
                        <Col>
                            <Field name="vehicleType" mode="dropdown" style={{left: 10}} component={renders.renderSelect} >
                                <Item label="Car" value="Car" />
                                <Item label="Bus" value="Bus" />
                                <Item label="Bajaji" value="Bajaji" />
                                <Item label="Motorbike" value="Motobike" />
                                <Item label="Camel" value="Camel" />
                            </Field>
                        </Col>
                    </Row>

                    <ListItem>
                        <Row>
                            <Col>
                                <Button success block onPress={handleSubmit} disabled={pristine || submitting}>
                                    <Text>Save Vehicle</Text>
                                </Button>
                            </Col>

                            <Col style={{width: 5}}></Col>

                            <Col>
                                <Button success block onPress={reset} disabled={pristine || submitting}>
                                  <Text>Clear Fields</Text>
                                </Button>
                            </Col>
                        </Row>
                    </ListItem>

                </List>
              </Content>
            </Container>
        )
    }
}

export default reduxForm({
  form: 'profileForm',
  destroyOnUnmount: false,
  validate
})(ProfileForm);
