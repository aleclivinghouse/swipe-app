import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Button, Thumbnail, Text, Left, Right, Title, Body, Icon } from 'native-base';
import {userProfileFetch} from './actions';
import { Actions } from 'react-native-router-flux';

const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: '',
  },
];
class YourProfile extends Component {
  constructor(){
    super()
}
  componentWillMount(){
    this.props.userProfileFetch()
  }

  HomePress(){
    Actions.Home()
  }
  render() {
    let deckitems;
    let profile = this.props.profile;
    let profileItems;
    if(this.props.profile === null || Object.keys(this.props.profile).length === 0){
      profileItems =  <Text>Loading</Text>
    } else {
      console.log('this is the profile that isnt null', this.props.profile)
      console.log('these are the pics', this.props.profile.pics);
      profileItems = (
        <DeckSwiper
          dataSource={cards}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: profile.pics[1].data.url}} />
                  <Body>
                    <Text>{profile.data.FirstName} {profile.data.LastName}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={{uri: profile.pics[1].data.url}} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Text>{profile.data.Bio}</Text>
              </CardItem>
            </Card>
          }
        />
      );
    }
    return (
      <Container>
        <Header>
          <Right>
            <Button transparent onPress={this.HomePress.bind(this)}>
              <Text>Home</Text>
            </Button>
          </Right>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <View>
          {profileItems}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.userProfile,
  }
};

export default connect(mapStateToProps, {userProfileFetch})(YourProfile);
