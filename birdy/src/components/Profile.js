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
        <div>
            <div>
                <h1 className="text-2xl m-4">Hi {login}</h1>
            </div>
            {/* Lise des personnes suivies */}
            <div className="m-2">
                <h1>Followings :</h1>
                <ListFollowings followings={followings} />
            </div>
            {/* Liste des personnes qui nous suivent */}
            <div className="m-2">
                <h1>Followers :</h1>
                <ListFollowings followings={followers} />
            </div>
            {/* Liste des messages écrits */}
            <div className="m-2">
                <ListAllMessages messages={myMessages} />
            </div>
        </div>
    );
}

export default Profile;
