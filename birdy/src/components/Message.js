function Message({ message }) {
  return (
    <div className="">
        <div>{message.author_login}</div>
        <div>{message.message}</div>
        <div>
            <div>Likes : {message.liked_by}</div>
            <div>Comments :
              <ul>
                {message.comments.map((m) => <li>{m}</li>)}
              </ul>
            </div>
        </div>

    </div>
  );
}

export default Message;