import React from 'react';

const Message = ({ data }) => (
  <div className="message__preview">
    <h6>{data.subject}</h6>
    <p>{data.from}</p>
  </div>
);

export default Message;