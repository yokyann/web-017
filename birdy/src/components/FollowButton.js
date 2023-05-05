import axios from "axios";

function FollowButton(props){
    const me=props.me;
    const user=props.user;

    function handleFollow(e) {
        console.log(user.login);
      axios.patch("http://localhost:4000/api/user/follow", {
        login: me.login,
        loginToFollow : user.login,
        })
        .then((res) => {
            console.log("res in follow", res.data.followings);
            props.setMyfollowings(res.data.followings);
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    }
    return (
        <button onClick={handleFollow} value="Follow" className="border">
              Follow
            </button>
    )
}

export default FollowButton;