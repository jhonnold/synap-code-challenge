import React from 'react';

class Message extends React.Component {
  render() {
    const { messages, match } = this.props;

    const messageData = messages.find(m => {
      return m.id === +match.params.messageId;
    });

    if (!messageData) return null;

    return (
      <div className="message__content">
        <h2>{messageData.subject}</h2>
        <div className="message__info">
          <h4>From: </h4>
          <p>{messageData.to}</p>
        </div>
        <div className="message__info">
          <h4>To: </h4>
          <p>{messageData.to}</p>
        </div>
        <div className="message__info">
          <h4>CC: </h4>
          <p>{messageData.cc.join('; ')}</p>
        </div>
        <hr />
        <p>{messageData.body}</p>
      </div>
    );
  }
}

export default Message;
