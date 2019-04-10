import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import {userProfileFetch} from './actions';

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
                    <Text>{profile.data.firstname} {profile.data.lastname}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={{uri: profile.pics[1].data.url}} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Text>{item.name}</Text>
              </CardItem>
            </Card>
          }
        />
      );
    }
    return (
      <Container>
        <Header />
        <View>
          {profileItems}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('this is mstp ', state);
  return {
    profile: state.profile.userProfile,
  }
};

export default connect(mapStateToProps, {userProfileFetch})(YourProfile);
