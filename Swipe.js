import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Button, Thumbnail, Text, Left, Right, Title, Body, Icon } from 'native-base';
import {fetchSwipeUsers, swipeRight, swipeLeft} from './actions';
import { Actions } from 'react-native-router-flux';

class Swipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [],
      cardNum: 0
    }
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  componentWillMount(){
    this.props.fetchSwipeUsers()
  }

  HomePress(){
    Actions.Home()
  }

  onSwipeLeft(){
     console.log('this is the cardNum', this.state.cardNum);
     const theProfile = this.props.profiles[this.state.cardNum];
     console.log('this is the profile we want');
     console.log(theProfile);
    //
    console.log('this is the profile id');
    console.log(theProfile.id);
    this.props.swipeLeft(theProfile.id);
     this.setState({cardNum: this.state.cardNum+1})
  }

  onSwipeRight(){
    console.log('on swipe right called');
    const theProfile = this.props.profiles[this.state.cardNum];
    this.props.swipeRight(theProfile.id);
    this.setState({cardNum: this.state.cardNum+1})
  }



  render(){
    let deckitems;
    let profiles = this.props.profiles;
    let profileItems;
    if(this.props.profiles === null || this.props.profiles.length === 0){
      profileItems =  <Text>Loading</Text>
    } else {
      console.log('this is the profile that isnt null', this.props.profiles[0])
      profileItems = (
        <DeckSwiper
          dataSource={this.props.profiles}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          looping={this.looping}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: item.pics[0].data.url}} />
                  <Body>
                    <Text>{item.data.FirstName} {item.data.LastName}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={{uri: item.pics[0].data.url}} />
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

export default connect(mapStateToProps, {fetchSwipeUsers, swipeRight, swipeLeft})(Swipe);

//
