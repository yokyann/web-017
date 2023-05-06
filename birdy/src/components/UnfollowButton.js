import axios from "axios";
import { useState, useEffect } from "react";

function FollowButton(props){
    const me=props.me;
    let login=""
    if (props.page==="profile_page"){
        login = props.user;
    }else{
        login=props.user.login;
    }
    async function getuser() {
        console.log()
        try {
          if (props.page === "profile_page" || props.page === "home_page") {
            const res = await axios.get(`http://localhost:4000/api/user/${props.me.login}`);
            console.log("axios.get('/user/') MINEEE : ", res.data);
            props.setMyFollowings(res.data.followings);
          }
          if (props.page === "visiting") {
            const res = await axios.get(`http://localhost:4000/api/user/${login}`);
            console.log("axios.get('/user') : ", res.data);
            props.setHisFollowings(res.data.followings);
            props.setFollowersv(res.data.followers);
          }
        } catch (error) {
          console.log("error : ", error);
        }
      }
      
    
      useEffect(() => {
        getuser();
      }, []);

      async function getFollowers(){
        try{
            const res = await axios.get(`http://localhost:4000/api/user/${login}`);
            props.setFollowersv(res.data.followers);
        }catch(error){
            console.log("error : ", error);
        }
      }
      

    function handleUnfollow(e) {
        console.log(login);
      axios.patch("http://localhost:4000/api/user/unfollow", {
        login: me.login,
        loginToUnfollow : login,
        })
        .then((res) => {
            console.log("res in uDTFGHJKLnfollow", login, me.login);
            console.log("res in unfollow", res.data);
            props.setMyfollowings(res.data.followings);
            getFollowers();
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    
    }

    return (
        <button onClick={handleUnfollow} value="Follow" className="border p-2">
              Unfollow
            </button>
    )
}

export default FollowButton;