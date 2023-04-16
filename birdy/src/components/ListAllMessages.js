import Message from './Message';

function ListAllMessages({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        console.log("un mesage", message),
        <Message message={message} />
      ))}
    </div>
  );
}

export default ListAllMessages;