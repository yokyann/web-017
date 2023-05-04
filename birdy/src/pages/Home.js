import ListAllMessages from "../components/ListAllMessages";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Feed from "../components/Feed";
import axios from "axios";
import Profile from "../components/Profile";

function Home(props) {
  console.log("props from Home : ", props);
  const login = props.user.login;
  const [messages, setMessages] = useState([]);
  const [filteredMsg, setfilteredMsg] = useState(messages); 
  const [followmsg,setFollowmsg] = useState(props.messages);
  const [following, setFollowing] = useState(false);

  async function fetchMessages() {
    try {
      const res = await axios.get("http://localhost:4000/api/messages");
      console.log("axios.get('/messages') : ", res.data);
      setMessages(res.data);
      setfilteredMsg(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }
  
  // ff jarrive pas c pg pour linstatn

  function getInputValue() {
    const inputVal = document.getElementById("filt").value.toLowerCase();
    const res = [];
    const messagesToFilter = following ? followmsg : messages;
  
    messagesToFilter.forEach((msg) => {
      if (
        msg.author_login.toLowerCase().includes(inputVal) ||
        msg.message.toLowerCase().includes(inputVal)
      ) {
        res.push(msg);
      }
    });
  
    setfilteredMsg(res);
  }

  

  useEffect(() => {
    fetchMessages();
  }, []);

  if (messages === null) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* colonne 1 side bar */}
      <div className="w-2/6 flex-col  bg-gray-800">
        <div className="flex items-center ">
          <img className="ml-4 w-12" src="birdy.png"></img>
          <h1 className="ml-4 text-white">Birdy {props.page}</h1>
        </div>
        {/* menu */}
        <Sidebar user={props.user} setLogout={props.setLogout} page={props.page} setPage={props.setPage} />
      </div>
      {/* colonne 2 main feed */}
      <div className="w-3/6 ">
        <div>
          <input
            type="search"
            className="block w-full m-4 p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 "
            id = "filt"
            placeholder="Search here"
          ></input>
          
        </div>
        <div className="m-4">
        {props.page === "home_page" ? (
          <Feed 
          messages={filteredMsg} 
          user={props.user} 
          followmsg={followmsg} 
          setFollowmsg={setFollowmsg} 
          following={following} 
          setFollowing={setFollowing}
          page = {props.page}
          setMessages={setfilteredMsg}
        />
        
        ) : (
          props.page === "profile_page" ? (
            <Profile user={props.user} page={props.page}></Profile> ) : (
              <div>404 page do not exist</div>))}
        </div>
      </div>
      <div className="w-1/6">
        <button
            type="submit"
            className="m-4 p-3 ml-6 mt-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            onClick={getInputValue}
          >
            Search
        </button></div>
    </div>

  );
}

export default Home;
