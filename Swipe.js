import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Button, Thumbnail, Text, Left, Right, Title, Body, Icon } from 'native-base';
import {fetchSwipeUsers} from './actions';
import { Actions } from 'react-native-router-flux';

class Swipe extends Component {
  constructor(){
    super()
    this.state = {
      cards: []
    }
  }

  componentWillMount(){
    this.props.fetchSwipeUsers()
  }

  HomePress(){
    Actions.Home()
  }

  render(){
    let deckitems;
    let profiles = this.props.profiles;
    let profileItems;
    if(this.props.profiles === null || this.props.profiles.length === 0){
      profileItems =  <Text>Loading</Text>
    } else {
      console.log('this is the profile that isnt null', this.props.profiles)
      profileItems = (
        <DeckSwiper
          dataSource={this.state.profiles}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: item.pics[1].data.url}} />
                  <Body>
                    <Text>{item.data.FirstName} {item.data.LastName}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={{uri: item.pics[1].data.url}} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Text>{item.data.Bio}</Text>
              </CardItem>
            </Card>
          }
        />
      );
    }
    return(
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
  console.log('this is mstp', state);
  return {
    profiles: state.profile.otherProfiles
  }
}

export default connect(mapStateToProps, {fetchSwipeUsers})(Swipe);
