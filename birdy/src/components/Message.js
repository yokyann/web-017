import axios from "axios";
import { useState, useEffect } from "react";

function Message({ message, user, page , messages, setMessages}) {

  const [liked, setLiked] = useState(false);
  const [likecount, setLikecount] = useState(message.liked_by.length);

  async function handleLike(e) {
    e.preventDefault();
    console.log("liked", liked)
    
    if (!liked) {
      console.log("liked shouldnt be", liked)
      await axios.patch("http://localhost:4000/api/message/like", {
        id: message._id,
        login: user.login
      });
      setLikecount(likecount + 1);
      setLiked(true);

    } else {
      await axios.patch("http://localhost:4000/api/message/unlike", {
        id: message._id,
        login: user.login
      });
      setLikecount(likecount - 1);
      setLiked(false);
    }
  }

  
  
 
  
      

  async function handleDelete(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this message?")) {
      console.log("oui", message._id);
      await axios.delete("http://localhost:4000/api/message/delete", {
        data: { id: message._id }
      })

        .then((res) => {
          setMessages(messages.filter((msg) => res._id !== msg._id));
          
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      console.log("non");
    }
  }


  return (
    <div className="relative container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1 className="font-bold border-b-2 border-black">{message.author_login}</h1>
      <h2 className="mt-1" >{message.message}</h2>
      <br />
      <div>
        <h3>Comments :
          <ul className="list-disc pl-4">
            {message.comments.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </h3>
      </div>
      {/* like */}
      <div className="flex absolute bottom-2  right-5">
        {/* {likecount}<button onClick={handleLike} ><img className="ml-2 w-4 h-4 mt-1 " src="Liked.png "></img></button> */}

        {likecount}<button onClick={handleLike} >{liked ?( <img className="ml-2 w-4 h-4 mt-1 " src="Liked.png "></img>) : (<img className="ml-2 w-4 h-4 mt-1 " src="love.png" ></img>) }</button>
      </div>
      {page === "profile_page" ?
        (<div
          id="trash"
          className="flex shadow absolute top-2 right-5 bg-red-300 rounded-xl p-2"
        >
          <button onClick={handleDelete} className="pr-2">Delete ?</button><img className="w-4 h-4 mt-1 " src="trash.png"></img>
        </div>) : (<div></div>)
      }
    </div>
  );
}

export default Message;
