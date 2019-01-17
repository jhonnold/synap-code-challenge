import React from 'react';
import LoadingCircle from '../components/LoadingCircle';
import MessagePreview from '../components/MessagePreview';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.list.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.list.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.list) return;

    const { scrollTop, scrollHeight, offsetHeight } = this.list;

    if (scrollTop + 8 > scrollHeight - offsetHeight) this.props.loadMore();
  }

  render() {
    const { loading, messages, error } = this.props.messageData;
    return (
      <div
        className="message__list"
        ref={el => {
          this.list = el;
        }}
      >
        {messages.map(message => (
          <MessagePreview data={message} key={message.id} />
        ))}
        {error && (
          <span className="error">
            There was an error loading messages. Please refresh or scroll
            again.
          </span>
        )}
        {loading && <LoadingCircle />}
      </div>
    );
  }
}

export default MessageList;
