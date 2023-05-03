import Message from './Message';

function ListAllMessages({ messages, info }) {
  return (
    <div>
      {messages.map((message) => (
        console.log("un mesage", message),
        <Message message={message} info = {info} />
      ))}
    </div>
  );
}

export default ListAllMessages;