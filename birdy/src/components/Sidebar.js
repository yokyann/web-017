import Friendslist from "../components/FriendsList";
import { useState } from "react";

function Sidebar(props) {

  function logoutHandler() {
    console.log("click on logouts")
    localStorage.removeItem('token');
    props.setLogout();
  } 

  function handleProfile() {
    props.setPage("profile_page");
  }

  function handleHome() {
    props.setPage("home_page");
  }

  return (
    <div className="sidebar">
      <div className="px-3 py-4  ">
        <ul className=" ">
          <li>
            <a
              href="#"
              onClick={handleHome}
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleProfile}
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="flex-1 ml-3">Profile</span>
            </a>
          </li>
          <li>
          <a
              href="#"
              onClick={logoutHandler}
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="flex-1 ml-3">Logout</span>
            </a>
          </li>
        </ul>
        {/* contient liste des amis */}
        <div className="mt-4 ml-4">
          {props.user.followings.length>0 ? (
                      <Friendslist friends={props.user.followings} />
):null                    }
        </div>
        <div className="">
          <p className="text-white pt-10">Hi {props.user.login} or {props.page}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
