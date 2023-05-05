import { useEffect } from 'react';
import Message from './Message';

function ListAllMessages(props) {
  const messages = props.messages;

  return (
    <div>
      {messages.map((message) => (
        <Message message={message} user = {props.user} page={props.page} setMyMessages={props.setMyMessages} setMessages={props.setMessages} messages={props.messages}/>
      ))}
    </div>
  );
}

export default ListAllMessages;