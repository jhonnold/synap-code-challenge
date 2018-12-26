import React from 'react';
import LoadingCircle from '../components/LoadingCircle';
import MessagePreview from '../components/MessagePreview';

class MessageList extends React.Component {
  render() {
    const { loading, messages, error } = this.props.messageData;

    return (
      <div className="message__list">
        {messages.map(message => (
          <MessagePreview data={message} key={message.id} />
        ))}
        {error && (
          <span className="error">
            There was an error loading your messages. Please refresh or scroll
            again.
          </span>
        )}
        {loading && <LoadingCircle />}
      </div>
    );
  }
}

export default MessageList;
