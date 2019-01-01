import React from 'react';
import { Link } from 'react-router-dom';

const Message = ({ data }) => (
  <Link className="message__preview" to={`/message/${data.id}`}>
    <h6>{data.subject}</h6>
    <p>{data.from}</p>
  </Link>
);

export default Message;
