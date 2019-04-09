import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import {userProfileFetch, picturesFetch} from './actions';

const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: '',
  },
];
class YourProfile extends Component {

  componentWillMount(){
    this.props.userProfileFetch()
    this.props.picturesFetch()
  }
  render() {
    console.log('this is the user profile', this.props.profile);
    let profile = this.props.profile;
    let images = this.props.pictures;
    console.log('these are the images', images);
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={profile.data} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('this is mstp ', state);
  return {
  profile: state.profile.userProfile,
  pictures: state.picture.pictures
  }
};

export default connect(mapStateToProps, {userProfileFetch, picturesFetch})(YourProfile);
