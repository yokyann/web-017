import axios from "axios";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";

function Message(props) {
  const user = props.user;
  const message = props.message;
  const page = props.page;
  const setMessages = props.setMessages;
  const messages = props.messages;

  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [likecount, setLikecount] = useState(message.liked_by.length);

  async function getComments() {
    try {
      const response = await axios.get(`http://localhost:4000/api/message/${message._id}`);
      console.log("res in getComments", response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.log("err", error);
    }
  }
  

  useEffect(() => {
    getComments();
  }, []);



  useEffect(() => {
    if (user && message.liked_by.includes(user.login)) {
      setLiked(true);
    }
  }, [user]);

  async function handleLike(e) {
    e.preventDefault();
    console.log("liked", liked);

    if (!liked) {
      console.log("liked shouldnt be", liked);
      await axios
        .patch("http://localhost:4000/api/message/like", {
          id: message._id,
          login: user.login,
        })
        .then((res) => {
          console.log("res in like", res.data);
          setLikecount(res.data.liked_by.length);
          setLiked(true);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      await axios
        .patch("http://localhost:4000/api/message/unlike", {
          id: message._id,
          login: user.login,
        })
        .then((res) => {
          console.log("res in unlike", res.data);
          setLikecount(res.data.liked_by.length);
          setLiked(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this message?")) {
      console.log("oui", message._id);
      await axios
        .delete("http://localhost:4000/api/message/delete", {
          data: { id: message._id },
        })

        .then((res) => {
          console.log("res", res.data);
          props.setMyMessages(messages.filter((m) => m._id !== message._id));
          setMessages(res.data);
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
      <h1 className="font-bold border-b-2 border-black">
        {message.author_login}
      </h1>
      <h2 className="mt-1">{message.message}</h2>
      <br />
      <div>
        <h3>
          <ul className="list-disc pl-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment._id}>
                  {comment}
                </li>
              ))
            ) : (
              <li>No comments yet</li>
            )}

          </ul>
        </h3>
        <AddComment message={message} comments={comments} setComments={setComments} user={props.user} ></AddComment>
      </div>
      {/* like */}
      <div className="flex absolute bottom-1  right-5">
        {/* {likecount}<button onClick={handleLike} ><img className="ml-2 w-4 h-4 mt-1 " src="Liked.png "></img></button> */}

        {likecount}
        <button onClick={handleLike}>
          {liked ? (
            <img className="ml-2 w-4 h-4 mt-1 " src="Liked.png "></img>
          ) : (
            <img className="ml-2 w-4 h-4 mt-1 " src="love.png"></img>
          )}
        </button>
      </div>
      {page === "profile_page" ? (
        <div
          id="trash"
          className="flex shadow absolute top-2 right-5 bg-red-300 rounded-xl p-2"
        >
          <button onClick={handleDelete} className="pr-2">
            Delete ?
          </button>
          <img className="w-4 h-4 mt-1 " src="trash.png"></img>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Message;
