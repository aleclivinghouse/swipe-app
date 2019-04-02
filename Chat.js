import React from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import {messageCreate} from './actions';
import * as firebase from 'firebase';
import 'firebase/firestore';

//this should get a chat id that we pass down to this components
class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    //we update all the messages to the current state

  }

  render() {
     const uid = firebase.auth().currentUser.uid;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: uid,
        }}
      />
    )
  }
}

export default connect(null, {messageCreate})(Chat);
