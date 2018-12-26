import React from 'react';
import axios from 'axios';
import MessagePreview from './components/MessagePreview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageData: {
        messages: [],
        loading: true,
        error: null,
      },
      peopleData: {
        people: [],
        loading: true,
        error: null,
      },
    };

    this.loadMessages = this.loadMessages.bind(this);
  }

  // On app load we need to make a request to start receiving messages
  componentDidMount() {
    this.loadMessages();
  }

  loadMessages(count = 20) {
    axios
    .get(`https://morning-falls-3769.herokuapp.com/api/messages?count=${count}`)
    .then((response) => {
      this.setState({
        messageData: {
          messages: [...response.data, ...this.state.messageData.messages],
          loading: false,
          error: null,
        }
      });
    })
    .catch((err) => {
      this.setState({
        messageData: {
          ...this.state.messageData,
          loading: false,
          error: err,
        }
      });
    });
  }

  render() {
    const { messageData } = this.state;

    return (
      <div>
        {messageData.messages.map((message) => (
          <MessagePreview data={message} key={message.id} />
        ))}
      </div>
    )
  }
}

export default App;
