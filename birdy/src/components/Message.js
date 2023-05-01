function Message({ message }) {
  return (
    <div className="">
        <div>{message.author_login}</div>
        <div>{message.message}</div>
        <div>
            <div>Likes : {message.liked_by}</div>
            <div>Comments :
              <ul>
                {message.comments.map((m) => <li key = {m}>{m}</li>)}
              </ul>
            </div>
        </div>
        <br/>

    </div>
  );
}

export default Message;