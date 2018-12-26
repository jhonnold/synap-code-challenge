import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import MessageList from './containers/MessageList';
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
        loading: false,
        error: null,
        index: 0,
      },
      screenSize: getScreenSize(),
    };

    this.loadMessages = this.loadMessages.bind(this);
    this.renderMessagePreview = this.renderMessagePreview.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderPeoplePreview = this.renderPeoplePreview.bind(this);
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

  loadMessages(count = 100, index = 0) {
    if (this.state.loading) return;

    this.setState({ messageData: {
      ...this.state.messageData,
      error: null,
      loading: true,
    }});

    axios
      .get(
        `https://morning-falls-3769.herokuapp.com/api/messages?count=${count}&start=${index}`
      )
      .then(response => {
        this.setState({
          messageData: {
            messages: [...response.data, ...this.state.messageData.messages],
            loading: false,
            error: null,
            index: this.state.messageData.index + count,
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
    return (
      <React.Fragment>
        {/* <Route path="/message/:messageId" exact compo */}
        <Route
          render={() => (
            <MessageList
              messageData={this.state.messageData}
              loadMore={page =>
                this.loadMessages(100, page * 100)
              }
            />
          )}
        />
      </React.Fragment>
    );
  }

  renderPeoplePreview() {
    return (
      <React.Fragment>
        <Route render={() => <div>Please select an email</div>} />
      </React.Fragment>
    );
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
          {this.renderPeoplePreview()}
          {this.renderMessagePreview()}
        </div>
      );
    }

    if (screenSize === 'medium') {
      return (
        <div className="home">
          <div className="home__left">
            {this.renderSearchBar()}
            {this.renderPeoplePreview()}
          </div>
          <div className="home__right">{this.renderMessagePreview()}</div>
        </div>
      );
    }

    return (
      <div className="home">
        <div className="home__left">{this.renderPeoplePreview()}</div>
        <div className="home__right">
          {this.renderSearchBar()}
          {this.renderMessagePreview()}
        </div>
      </div>
    );
  }
}

export default App;
