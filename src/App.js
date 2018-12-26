import React from 'react';
import axios from 'axios';
import MessagePreview from './components/MessagePreview';
import LoadingCircle from './components/LoadingCircle';
import SearchBar from './components/SearchBar';

const getScreenSize = () => {
  if (window.innerWidth < 601) return 'small';
  if (window.innerWidth < 769) return 'medium';
  return 'large';
};

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
      screenSize: getScreenSize(),
    };

    this.loadMessages = this.loadMessages.bind(this);
    this.renderMessagePreview = this.renderMessagePreview.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.handleScreenResize = this.handleScreenResize.bind(this);
  }

  // On app load we need to make a request to start receiving messages
  componentDidMount() {
    window.addEventListener('resize', this.handleScreenResize);
    this.loadMessages();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenResize);
  }

  handleScreenResize() {
    const newScreenSize = getScreenSize();
    if (this.state.screenSize !== newScreenSize) {
      this.setState({ screenSize: newScreenSize });
    }
  }

  loadMessages(count = 20) {
    axios
      .get(
        `https://morning-falls-3769.herokuapp.com/api/messages?count=${count}`
      )
      .then(response => {
        this.setState({
          messageData: {
            messages: [...response.data, ...this.state.messageData.messages],
            loading: false,
            error: null,
          },
        });
      })
      .catch(err => {
        this.setState({
          messageData: {
            ...this.state.messageData,
            loading: false,
            error: err,
          },
        });
      });
  }

  renderMessagePreview() {
    const { loading, messages, error } = this.state.messageData;
    if (loading) return <LoadingCircle />;
    if (error) return <span class="error">There was an error loading your messages, please reload the page.</span>;

    return messages.map(message => (
      <MessagePreview data={message} key={message.id} />
    ));
  }

  renderSearchBar() {
    return <SearchBar />;
  }

  render() {
    const { screenSize } = this.state;

    if (screenSize === 'small') {
      return (
        <div className="home home--small">
          {this.renderSearchBar()}
          {/* Company People */}
          {this.renderMessagePreview()}
        </div>
      );
    }

    if (screenSize === 'medium') {
      return (
        <div className="home">
          <div className="home__left">
            {this.renderSearchBar()}
            {/* Person Company */}
          </div>
          <div className="home__right">{this.renderMessagePreview()}</div>
        </div>
      );
    }

    return (
      <div className="home">
        <div className="home__left">{/* Person Company */}</div>
        <div className="home__right">
          {this.renderSearchBar()}
          {this.renderMessagePreview()}
        </div>
      </div>
    );
  }
}

export default App;
