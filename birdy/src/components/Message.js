function Message({ message }) {
  return (
    <div className="relative container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h1 className="font-bold border-b-2 border-black">{message.author_login}</h1>
        <h2 className="mt-1" >{message.message}</h2>
        <br />
        <div>
            
            <h3>Comments :
              <ul className="list-disc pl-4">
                {message.comments.map((m) => <li key = {m}>{m}</li>)}
              </ul>
            </h3>
        </div>
        <div className="flex absolute bottom-2  right-5">
              {message.liked_by.length}<img className=" w-4 h-4 mt-1 "src = "Liked.png "></img>
        </div>
    </div>
  );
}

export default Message;