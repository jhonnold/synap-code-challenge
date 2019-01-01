import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import MessageList from './containers/MessageList';
import PeopleList from './containers/PeopleList';
import Message from './components/Message';
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
      peopleData: {
        people: {},
        loading: 0,
        error: null,
      },
      screenSize: getScreenSize(),
    };

    this.loadMessages = this.loadMessages.bind(this);
    this.loadPerson = this.loadPerson.bind(this);
    this.renderMessagePreview = this.renderMessagePreview.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderPeopleList = this.renderPeopleList.bind(this);
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

  loadMessages(count = 20, index = 0) {
    if (this.state.loading || this.loading) return;

    this.setState({
      messageData: {
        ...this.state.messageData,
        error: null,
        loading: true,
      },
    });

    this.loading = true;

    axios
      .get(
        `https://morning-falls-3769.herokuapp.com/api/messages?count=${count}&start=${index}`
      )
      .then(response => {
        this.loading = false;
        this.setState({
          messageData: {
            messages: [...this.state.messageData.messages, ...response.data],
            loading: false,
            error: null,
            index: this.state.messageData.index + count,
          },
        });
      })
      .catch(err => {
        this.loading = false;
        this.setState({
          messageData: {
            ...this.state.messageData,
            loading: false,
            error: err,
          },
        });
      });
  }

  loadPerson(email) {
    this.setState({
      peopleData: {
        ...this.state.peopleData,
        error: null,
        loading: this.state.peopleData.loading + 1,
      },
    });

    axios
      .get(`https://morning-falls-3769.herokuapp.com/api/people/${email}`)
      .then(response => {
        this.setState({
          peopleData: {
            people: {
              ...this.state.peopleData.people,
              [email]: response.data,
            },
            loading: this.state.peopleData.loading - 1,
            error: null,
          },
        });
      });
  }

  renderMessagePreview() {
    return (
      <Switch>
        <Route
          path="/message/:messageId"
          exact
          render={routeParams => (
            <Message
              {...routeParams}
              messages={this.state.messageData.messages}
            />
          )}
        />
        <Route
          render={() => (
            <MessageList
              messageData={this.state.messageData}
              loadMore={() =>
                this.loadMessages(20, this.state.messageData.index)
              }
            />
          )}
        />
      </Switch>
    );
  }

  renderPeopleList() {
    return (
      <Switch>
        <Route
          path="/message/:messageId"
          render={routeParams => (
            <PeopleList
              {...routeParams}
              messages={this.state.messageData.messages}
              peopleData={this.state.peopleData}
              getPersonData={this.loadPerson}
            />
          )}
        />
        <Route
          render={() => (
            <div className="people__placeholder">
              <p>Select an email</p>
            </div>
          )}
        />
      </Switch>
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
          {this.renderPeopleList()}
          {this.renderMessagePreview()}
        </div>
      );
    }

    if (screenSize === 'medium') {
      return (
        <div className="home">
          <div className="home__left">
            {this.renderSearchBar()}
            {this.renderPeopleList()}
          </div>
          <div className="home__right">{this.renderMessagePreview()}</div>
        </div>
      );
    }

    return (
      <div className="home">
        <div className="home__left">{this.renderPeopleList()}</div>
        <div className="home__right">
          {this.renderSearchBar()}
          {this.renderMessagePreview()}
        </div>
      </div>
    );
  }
}

export default App;
