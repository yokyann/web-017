import axios from "axios";
import { useState, useEffect } from "react";

function FollowButton(props){
    const me=props.me;
    const user=props.user;

    async function getuser() {
        console.log("HELLO WHY ARE YOU NOT WORKING ?")
        try {
          if (props.page === "profile_page" || props.page === "home_page") {
            const res = await axios.get(`http://localhost:4000/api/user/${props.me.login}`);
            console.log("axios.get('/user/') MINEEE : ", res.data);
            props.setMyFollowings(res.data.followings);
          }
          if (props.page === "visiting") {
            const res = await axios.get(`http://localhost:4000/api/user/${props.user.login}`);
            console.log("axios.get('/user') : ", res.data);
            props.setHisFollowings(res.data.followings);
            props.setFollowersv(res.data.followers);
          }
        } catch (error) {
          console.log("error : ", error);
        }
      }
      
      async function getFollowers(){
        try{
            const res = await axios.get(`http://localhost:4000/api/user/${props.user.login}`);
            props.setFollowersv(res.data.followers);
        }catch(error){
            console.log("error : ", error);
        }
      }
      
    
      useEffect(() => {
        getuser();
      }, []);

      
    function handleFollow(e) {
        console.log(user.login);
      axios.patch("http://localhost:4000/api/user/follow", {
        login: me.login,
        loginToFollow : user.login,
        })
        .then((res) => {
            console.log("res in follow", res.data);
            props.setMyfollowings(res.data.followings);
            getFollowers();
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    }
    return (
        <button onClick={handleFollow} value="Follow" className="border p-2">
              Follow
            </button>
    )
}

export default FollowButton;