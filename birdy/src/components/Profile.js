import React, { useState, useEffect } from "react";
import axios from "axios";
import ListAllMessages from "./ListAllMessages";
import ListFollowings from "./ListFollowings";

function Profile(props) {
    const [myMessages, setMyMessages] = useState([]);
    const login = props.user.login;
    const followings = props.user.followings;
    const followers = props.user.followers

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

    return (
        <div className="flex flex-col md:flex-column ">
            <div className="relative container">
                <h1 className=" text-2xl m-4">Hi {login}</h1>
                <div className="flex absolute top-5 right-4">
                    <button>Delete user ???</button>
                </div>
            </div>
            <br></br>
            {/* Lise des personnes suivies */}
            <div className="flex flex-col  md:flex-row">
                <div className="rounded-xl   p-5 relative container mx-auto w-1/2 flex-col m-2 mr-2 bg-sky-100">
                    <h1 className="font-bold border-b-2 border-black">Followings :</h1>
                    <ListFollowings followings={followings} />
                </div>
                
                {/* Liste des personnes qui nous suivent */}
                <div className="rounded-xl relative p-5 container mx-auto w-1/2 flex-col m-2  bg-sky-100">
                    <h1 className="font-bold border-b-2 border-black">Followers :</h1>
                    <ListFollowings followings={followers} />
                </div>
            </div>
            {/* Liste des messages écrits */}
            <div className="m-2">
                <ListAllMessages messages={myMessages} page={props.page} user={props.user} setMyMessages={setMyMessages} setMessages={props.setMessages} fetchMessages={props.fetchMessages}/>
            </div>
        </div>
    );
}

export default Profile;
