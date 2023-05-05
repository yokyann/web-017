import ListAllMessages from "./ListAllMessages";
import { useState, useEffect } from "react";
import ListFollowings from "./ListFollowings";
import axios from "axios";
import ListUsers from "./ListUsers";

function Feed(props) {
  const [newMessage, setNewMessage] = useState("")
  const followings = props.user.followings;
  const following = props.following;
  const setFollowing = props.setFollowing;
  const followmsg = props.followmsg;
  const setFollowmsg = props.setFollowmsg;
  const log = props.user.login
  const messages = props.messages
  const setMessages = props.setMessages

  const [users, setUsers] = useState([]);


  function onlyfollowers() {
    var res = []
    props.messages.forEach(msg => {
      if (msg.author_login && followings.includes(msg.author_login.toLowerCase()))
        res.push(msg)
    })
    setFollowmsg(res)
  }


  function handleAll() {
    setFollowing(false)
  }
  function handleFollowing() {
    setFollowing(true)
    onlyfollowers()
  }


  function handleCreateMessage(event) {
    if (event.key === "Enter") {
      createMessage()
    }

  }
  function handleButtonClick() {
    createMessage()
  }
  function handleChange(event) {
    console.log(event.target.value)
    setNewMessage(event.target.value)

  }



  async function createMessage(e) {
    if (newMessage === "") {
      alert("Please enter a message");
      return;
    }
    await axios
      .post("http://localhost:4000/api/messages/new", {
        newMessage,
        log
      })
      .then((res) => {
        console.log("res.data", res.data);
        setMessages([res.data, ...messages]);
        setNewMessage("");
      })
    console.log("testtttttttttttttherfdjkghdsfjklghjk", newMessage)
    console.log(log)
  }


  function handleSeeMessages() {
    props.setUserOnly(false)
  }
  function handleSeeUsers() {
    props.setUserOnly(true)
  }

  return (
    <div>
      <div>
              <ul class="text-center divide-x divide-gray-800 rounded-lg flex " >
                <li class="w-full">
                  <button onClick={handleSeeMessages}  className=" w-full p-4 rounded-tl-lg bg-gray-200 hover:bg-gray-100 focus:outline-none">Messages</button>
                </li>
                <li class="w-full">
                  <button onClick={handleSeeUsers} className=" w-full p-4 rounded-tr-lg bg-gray-200 hover:bg-gray-100 focus:outline-none" >Users</button>
                </li>

              </ul>
            </div>
      {props.userOnly ? (<ListUsers me={props.user} users={users} setUsers={setUsers} />) : (
        <div>
          <div className="my-2">
            <label>Create new message</label>
            <br></br>
            <input
              value={newMessage}
              onChange={handleChange}
              onKeyDown={handleCreateMessage}
              type="text"
              className=" w-full p-2 h-20 border rounded-lg"></input>

            <button className="border p-2 my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" onClick={handleButtonClick}>Create new message</button>
          </div>

          {/* list of all messages */}
          <div>
            {/* <ListMessages /> */}
            <div>
              <ul class="text-center divide-x divide-gray-800 rounded-lg flex " >
                <li class="w-full">
                  <button onClick={handleAll}  className=" w-full p-4 rounded-tl-lg bg-gray-200 hover:bg-gray-100 focus:outline-none">All</button>
                </li>
                <li class="w-full">
                  <button onClick={handleFollowing} className=" w-full p-4 rounded-tr-lg bg-gray-200 hover:bg-gray-100 focus:outline-none" >Followings</button>
                </li>

              </ul>
            </div>

            {following ? (
              <ListAllMessages messages={followmsg} info={props} page={props.page} setMessages={setMessages} />
            ) : (
              // List all messages
              <ListAllMessages messages={props.messages} user={props.user} page={props.page} setMessages={props.setMessages} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Feed;