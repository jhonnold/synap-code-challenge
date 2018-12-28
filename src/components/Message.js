import React from 'react';
import { Redirect } from 'react-router-dom';

const Message = ({ messages, match }) => {
  const messageData = messages.find(m => {
    return m.id === +match.params.messageId;
  });

  if (!messageData) return <Redirect to="/" />;

  return (
    <div className="message__content">
      <h2>{messageData.subject}</h2>
      <div className="message__info">
        <h4>From: </h4>
        <p>{messageData.from}</p>
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
};

export default Message;
