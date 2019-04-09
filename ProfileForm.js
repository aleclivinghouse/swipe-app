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
Body,
Form,
Footer,
FooterTab
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
        this.state = {
          count: 0,
          checks: [],
          disabled: true
        }
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

    handleCheck(arg){
      console.log('handleChec fired');
      let flag = false;
      for(let check of this.state.checks){
        if(check === arg){
          flag = true;
        }
      }
      if(flag === true){
            this.setState({checks: this.state.checks.filter(item => item !== arg)}, () => {
                console.log('callback fired');
                console.log(this.state.checks.length);
              if(this.state.checks.length === 5){
                this.setState({disabled: false})
              } else {
                  this.setState({disabled: true})
              }
            });
        } else {
          this.setState({checks: [...this.state.checks, arg]}, () => {
                console.log('callback fired');
                console.log(this.state.checks.length);
            if(this.state.checks.length === 5){
              this.setState({disabled: false})
            } else{
                this.setState({disabled: true})
            }
          })
        }

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
                <Text>{this.state.count}</Text>
                <List>
                    <Field name="FirstName" placeholder="John" type="text" label="first name" component={renders.renderText} />
                    <Field name="LastName" placeholder="Doe" type="text" label="last name" component={renders.renderText} />
                      <Field name="Bio"  type="text" label="Bio" component={renders.renderTextArea} />
                        <Row>
                            <Col style={{justifyContent: 'center', alignItems: 'center' }}>
                                <Title style={{color: 'grey'}}>Pick Five Compatibility Points</Title>
                                <Text style={{color: 'grey'}}> Your answers will not be seen </Text>
                            </Col>
                        </Row>

                    <Field name="instrument" component={renders.renderCheckbox} label="I currently play a musical instrument" onChange={this.handleCheck.bind(this, 'instrument')}/>
                    <Field name="sports" component={renders.renderCheckbox} label="I follow sports closely" onChange={this.handleCheck.bind(this, 'sports')}/>
                    <Field name="fashion" component={renders.renderCheckbox} label="I follow the fashion/lifestyle industry" onChange={this.handleCheck.bind(this, 'fashion')}/>
                    <Field name="children" component={renders.renderCheckbox} label="I have children"  onChange={this.handleCheck.bind(this, 'children')}/>
                    <Field name="straight-edge" component={renders.renderCheckbox} label="I'm straight edge"  onChange={this.handleCheck.bind(this, 'straight-edge')}/>
                    <Field name="visual-arts" component={renders.renderCheckbox} label="I participate in the visual arts" onChange={this.handleCheck.bind(this, 'visual-arts')}/>
                    <Field name="outdoors" component={renders.renderCheckbox} label="I do lots of outdoor activities" onChange={this.handleCheck.bind(this, 'outdoors')}/>
                    <Field name="reading" component={renders.renderCheckbox} label="I am passionate about literature" onChange={this.handleCheck.bind(this, 'reading')}/>
                    <Field name="political" component={renders.renderCheckbox} label="I closely follow politics" onChange={this.handleCheck.bind(this, 'politics')}/>
                    <Field name="fitness" component={renders.renderCheckbox} label="Fitness is a big part of my life"  onChange={this.handleCheck.bind(this, 'fitness')}/>
                    <Field name="technology" component={renders.renderCheckbox} label="I am passionate about technology" onChange={this.handleCheck.bind(this, 'technology')}/>
                    <Field name="science" component={renders.renderCheckbox} label="I am passionate about science" onChange={this.handleCheck.bind(this, 'science')}/>

                    <ListItem>
                        <Row>
                            <Col>
                                <Button success block onPress={handleSubmit} disabled={this.state.disabled}>
                                    <Text>Save Vehicle</Text>
                                </Button>
                            </Col>

                            <Col style={{width: 5}}></Col>
                            <Col>

                            </Col>
                        </Row>
                    </ListItem>
                </List>
              </Content>
              <Footer>
                <FooterTab>
                  <Button full>
                    <Text>Footer</Text>
                  </Button>
                </FooterTab>
              </Footer>
            </Container>
        )
    }
}

export default reduxForm({
  form: 'profileForm',
  destroyOnUnmount: false,
  validate
})(ProfileForm);
