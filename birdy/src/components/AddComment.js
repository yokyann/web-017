import React, { useState } from "react";
import axios from "axios";

function AddComment(props) {
  const [newComment, setNewComment] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setNewComment(e.target.value);
  }

  async function createComment(){
    if (newComment === "") {
      alert("Please enter a message");
      return;
    }
    await axios
      .patch("http://localhost:4000/api/messages/addcomment", {
        id: props.message._id,
        newComment,
        login: props.user.login,
      })
      .then((res) => {
        console.log("res.data", res.data);
        props.setComments(res.data.comments);
        setNewComment("");
      });
    console.log("testtttttttttttttherfdjkghdsfjklghjk", newComment);
  }
  function handleCreateComment(event) {
    if (event.key === "Enter") {
      createComment();
    }
  }
  function handleButtonClick() {
    createComment();
  }


  return (
    <div className="m-2 grid">
            <input
              value={newComment}
              onChange={handleChange}
              onKeyDown={handleCreateComment}
              type="text"
              className=" w-full p-2 h-20 border rounded-lg"
            ></input>
            <div className="my-4"><button onClick={handleButtonClick} className="border p-2 absolute right-20 bg-blue-500 text-white rounded">Add Comment</button></div>
    </div>
  );
}

export default AddComment;