import Message from './Message';

function ListAllMessages({ messages, user, page, setMessages }) {
  return (
    <div>
      {messages.map((message) => (
        console.log("un mesage", message),
        <Message message={message} user = {user} page={page} setMessages={setMessages} messages={messages}/>
      ))}
    </div>
  );
}

export default ListAllMessages;