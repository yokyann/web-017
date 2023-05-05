import ListAllMessages from "./ListAllMessages";
import { useState,useEffect} from "react";
import ListFollowings from "./ListFollowings";
import axios from "axios";

function Feed(props){
  const [newMessage, setNewMessage] = useState("")
  const followings = props.user.followings;
  const following = props.following;
  const setFollowing = props.setFollowing;
  const followmsg = props.followmsg;
  const setFollowmsg = props.setFollowmsg;
  const log = props.user.login
  const messages = props.messages
  const setMessages = props.setMessages

  function onlyfollowers(){
    var res = []
    props.messages.forEach(msg =>{
      if (msg.author_login && followings.includes(msg.author_login.toLowerCase()))
        res.push(msg)
    })
    setFollowmsg(res)
  }
  
  function switchFollow(){
    if (following){
      setFollowing(false)
    }else{
      setFollowing(true)
      onlyfollowers()
    }
  }

  useEffect(() => {
    onlyfollowers()
  }, []);

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
    await axios
      .post("http://localhost:4000/api/messages/new",{
        newMessage,
        log
      })
      .then((res) => {
        console.log("res.data", res.data);
        setMessages([res.data, ...messages]);
        setNewMessage("");
      })
    console.log("testtttttttttttttherfdjkghdsfjklghjk",newMessage)
    console.log(log)
  }

  return (
    <div>
      <div className="my-2">
        <label>Create new message</label>
        <br></br>
        <input  
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
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={switchFollow}
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            for="flexSwitchCheckDefault"
          >
            Following Only
          </label>
        </div>
        {following ? (
          <ListAllMessages messages={followmsg} info = {props} page={props.page} setMessages={setMessages}/>
        ) : (
          // List all messages
          <ListAllMessages messages={props.messages} user = {props.user} page={props.page}/>
        )}
      </div>
    </div>
  )
}

export default Feed;