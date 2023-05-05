import axios from "axios";

function FollowButton(props){
    const me=props.me;
    const user=props.user;

    function handleUnfollow(e) {
        console.log(user.login);
      axios.patch("http://localhost:4000/api/user/unfollow", {
        login: me.login,
        loginToUnfollow : user.login,
        })
        .then((res) => {
            console.log("res in unfollow", res.data);
            props.setMyfollowings(res.data.followings);
            
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    
    }

    return (
        <button onClick={handleUnfollow} value="Follow" className="border">
              Unfollow
            </button>
    )
}

export default FollowButton;