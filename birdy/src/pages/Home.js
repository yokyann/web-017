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
  const [followmsg, setFollowmsg] = useState([]);
  const [following, setFollowing] = useState(false);
  const [userOnly, setUserOnly] = useState(false);
  const [visitMe, setVisitMe] = useState({});

  async function fetchMessages() {
    try {
      const res = await axios.get("http://localhost:4000/api/messages");
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

    console.log("inputVal", following);
    console.log("messagesToFilter ARE YOU FILTERED", messagesToFilter);

    messagesToFilter.forEach((msg) => {
      if (
        msg.author_login.toLowerCase().includes(inputVal) ||
        msg.message.toLowerCase().includes(inputVal)
      ) {
        res.push(msg);
      }
    });
    console.log("res FILTERED ", res)
    setfilteredMsg(res);
  }

  useEffect(() => {
    fetchMessages();
    getInputValue();
  }, []);

  if (messages === null) {
    return <div>Loading messages...</div>;
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      getInputValue()
    }

  }
  function handleButtonClick() {
    getInputValue()
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
        <Sidebar
          user={props.user}
          setLogout={props.setLogout}
          page={props.page}
          setPage={props.setPage}
        />
      </div>
      {/* colonne 2 main feed */}
      <div className="w-5/6 p-4">
        <div className="flex ml-6">
          <input
            type="search"
            className="block w-full m-4 p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 "
            id="filt"
            placeholder="Search here"
            onKeyDown={handleEnter}
          ></input>
          <div className="w-1/6">
            <button
              type="submit"
              className="m-4 p-3 ml-6 mt-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              onClick={handleButtonClick}
            >
              Search
            </button>
          </div>
          
    
        </div>
        
        <div className="mx-10 my-4 center ">
          {props.page === "home_page" ? (
            <Feed
              messages={filteredMsg}
              user={props.user}
              followmsg={followmsg}
              setFollowmsg={setFollowmsg}
              following={following}
              setFollowing={setFollowing}
              page={props.page}
              setMessages={setfilteredMsg}
              userOnly={userOnly}
              setUserOnly={setUserOnly}
              setPage={props.setPage}
              setVisitMe={setVisitMe}
            />
          ) : props.page === "profile_page" ? (
            <Profile setLogout={props.setLogout} user={props.user}   page={props.page} setMessages={setfilteredMsg} fetchMessages={fetchMessages}></Profile>
          ) : (
              props.page === "visiting" ? (
                <Profile setLogout={props.setLogout} user={visitMe} page={props.page} setMessages={setfilteredMsg} fetchMessages={fetchMessages}></Profile>
              ):(null)         

          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
