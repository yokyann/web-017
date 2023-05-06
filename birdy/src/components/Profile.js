import React, { useState, useEffect } from "react";
import axios from "axios";
import ListAllMessages from "./ListAllMessages";
import ListFollowings from "./ListFollowings";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import ListFollowingsProfile from "./ListFollowingsProfile";
import ListUsers from "./ListUsers";

function Profile(props) {
  const [myMessages, setMyMessages] = useState([]);
  const login = props.user.login;
  const [followers, setFollowers] = useState([]);
  const [followersv, setFollowersv] = useState([]);
  const me = props.me;
  const melogin = props.me.login;
  const [commonFollowers, setCommonFollowers] = useState([]);

  useEffect(() => {
    const commonFollowers = props.user.followers.filter(
      (follower) =>
        follower !== me.login && props.myfollowings.includes(follower)
    );
    setCommonFollowers(commonFollowers);
  }, [props.myfollowings, me.login, props.user.followers]);

  async function getuser() {
    try {
      if (props.page === "profile_page" || props.page === "home_page") {
        const res = await axios.get(
          `http://localhost:4000/api/user/${props.me.login}`
        );
        console.log("axios.get('/user/') MINEEE : ", res.data);
        setFollowers(res.data.followers);

        props.setMyfollowings(res.data.followings);
      }
      if (props.page === "visiting") {
        const res = await axios.get(
          `http://localhost:4000/api/user/${props.user.login}`
        );
        console.log("axios.get('/user') : ", res.data);
        setFollowersv(res.data.followers);
        props.setFollowingv(res.data.followings);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    getuser();
  }, []);

  async function fetchMyMessages() {
    try {
      console.log("login DANS LE FRONT: ", login);
      const res = await axios.get("http://localhost:4000/api/messages/user", {
        params: { login },
      });
      console.log("axios.get('/messages/user') : ", res.data);
      setMyMessages(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    fetchMyMessages();
  }, []);

  function deleteUser(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      console.log("oui", login);
      axios
        .delete("http://localhost:4000/api/user/delete", {
          data: { login },
        })
        .then((res) => {
          console.log("res", res.data);
          props.setLogout();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  return (
    <div className="flex flex-col md:flex-column ">
      <div className="flex  ">
        <img className=" object-contain h-20" src="technology.png"></img>
        <button className="ml-8 text-6xl w-4/5 text-left">{login}</button>
        {props.page === "profile_page" ? (
          <div className="w-1/5 items-center justify-center flex">
            <button onClick={deleteUser} className="p-2 border rounded-l">
              Delete user
            </button>
          </div>
        ) : (
          <div className="flex">
            {props.myfollowings.includes(props.user.login) ? (
              <div >
                <UnfollowButton
                  setMyfollowings={props.setMyfollowings}
                  setHisFollowings={props.setFollowingsv}
                  me={props.me}
                  user={props.user}
                  setFollowersv={setFollowersv}
                />
              </div>
            ) : (
              <div>
                <FollowButton
                  setMyfollowings={props.setMyfollowings}
                  setHisFollowings={props.setFollowingsv}
                  me={props.me}
                  user={props.user}
                  setFollowersv={setFollowersv}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <br></br>
      {/* Lise des personnes suivies */}
      <div className="flex flex-col  md:flex-row">
        <div className="rounded-xl   p-5 relative container mx-auto w-1/2 flex-col m-2 mr-2 bg-sky-100">
          <h1 className="font-bold border-b-2 border-black">Followings : </h1>
          {props.page === "profile_page" ? (
            <ListFollowingsProfile setMyfollowings={props.setMyfollowings}
            setFollowersv={setFollowersv}
            me={me}
            getuser={props.getuser}
            followings={props.myfollowings} 
            page={props.page}/>
          ) : (
            <ListFollowings followings={props.followingv} />
          )}
        </div>

        {/* Liste des personnes qui nous suivent */}
        <div className="rounded-xl relative p-5 container mx-auto w-1/2 flex-col m-2  bg-sky-100">
          <h1 className="font-bold border-b-2 border-black">Followers : 
</h1>
          {props.page === "profile_page" ? (
            <ListFollowings followings={followers} />
          ) : (
            <ListFollowings followings={followersv} />
          )}
        </div>
      </div>
      {/* Liste des messages écrits */}
      <div className="m-2">
        <ListAllMessages
          messages={myMessages}
          page={props.page}
          user={props.user}
          setMyMessages={setMyMessages}
          setMessages={props.setMessages}
          fetchMessages={props.fetchMessages}
        />
      </div>
    </div>
  );
}

export default Profile;
