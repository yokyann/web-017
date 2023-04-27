import ListAllMessages from "../components/ListAllMessages";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

function Home(props) {
  console.log("props from Home : ", props);
  const login = props.userInfos.login;
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

  return (
    <div className="flex flex-col items-center md:flex-row ">
      {/* colonne 1 side bar */}
      <div className="w-2/6 h-screen  bg-gray-800">
        <div className="flex items-center ">
          <img className="ml-4 w-12" src="birdy.png"></img>
          <h1 className="ml-4 text-white">Birdy</h1>
        </div>

        {/* menu */}
        <Sidebar login={login} />
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
        <div className="m-4">
          <label>Create new meassges</label>
          <br></br>
          <input className="border"></input>
        </div>

        {/* list of all messages */}
        <div className="ml-4">
          {/* <ListMessages /> */}
          <div>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            for="flexSwitchCheckDefault"
          >
            Following Only
          </label>
          </div>
          {following ? (
            // List friends messages (not the correct way yet !)
            <ListAllMessages messages={messages} />
          ) : (
            // List all messages
            <ListAllMessages messages={messages} /> 
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
