function Message({ message }) {
  return (
    <div className="m-2 p-2">
        <div>{message.author_login}</div>
        <div>{message.message}</div>
        <div>
            <div>Likes : </div>
            <div>Comments : </div>
        </div>

    </div>
  );
}

export default Message;