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
  const [following, setFollowing] = useState(false);

  async function fetchMessages() {
    try {
      const res = await axios.get("http://localhost:4000/api/messages");
      console.log("axios.get('/messages') : ", res.data);
      setMessages(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  function profilePage() {
    props.setPage("profile_page");
  }
  function homePage() {
    props.setPage("home_page");
  }

  return (
    <div className="flex flex-col items-center md:flex-row ">
      {/* colonne 1 side bar */}
      <div className="w-2/6 h-screen  bg-gray-800">
        <div className="flex items-center ">
          <img className="ml-4 w-12" src="birdy.png"></img>
          <h1 className="ml-4 text-white">Birdy {props.page}</h1>
        </div>

        {/* menu */}
        <Sidebar setLogout={props.setLogout} page={props.page} setPage={props.setPage} />
      </div>
      {/* colonne 2 main feed */}
      <div className="w-3/6 h-screen">
        <div>
          <input
            type="search"
            className="block w-full m-4 p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Search here"
          ></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
        {/* create new meassges */}
        {props.page === "home_page" ? (
          <Feed messages={messages} following={following}></Feed>
        ) : (
          props.page === "profile_page" ? (
            <Profile></Profile> ) : (
              <div>404 page do not exist</div>))}
      </div>
    </div>
  );
}

export default Home;
