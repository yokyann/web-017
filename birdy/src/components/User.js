import axios from "axios";
import { useState, useEffect } from "react";

function User(props) {
  const user = props.user;
  const me = props.me;
  const [myfollowings, setMyfollowings] = useState(me.followings);

  const commonFollowers = user.followers.filter(
    (follower) => follower !== me.login && myfollowings.includes(follower)
  );
  useEffect(() => {
    axios.get(`http://localhost:4000/api/user/${me.login}`)
      .then((res) => {
        setMyfollowings(res.data.followings);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);


  function handleFollow(e) {
    console.log("clicek");
    console.log("e.target.value", e.target.value)
    if ("Follow" === e.target.value) {
        console.log(user.login);
      axios.patch("http://localhost:4000/api/user/follow", {
        login: me.login,
        loginToFollow : user.login,
        })
        .then((res) => {
            console.log("res in follow", res.data.followings);
            setMyfollowings(res.data.followings);
            
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    }
    if ("Unfollow" === e.target.value) {
        console.log(user.login);
      axios.patch("http://localhost:4000/api/user/unfollow", {
        login: me.login,
        loginToUnfollow : user.login,
        })
        .then((res) => {
            console.log("res in unfollow", res.data);
            setMyfollowings(res.data.followings);
            
            })
        .catch((err) => {
            console.log("err", err);
            }
        );
    }
  }

  function visitPage(e) {
    console.log("visitPage");
    props.setVisitMe(user);
    props.setPage("visiting");
  }

  if (user.login !== me.login) {
    return (
      <div className="hover:bg-gray-300 flex container mx-auto bg-gray-200 rounded-xl shadow border p-4 m-4">
        <div
          onClick={visitPage}
        >
          <h1 className="text-xl">{user.login}</h1>
          {commonFollowers.length > 0 ? (
            <h2 className="mt-2">Followed by :</h2>
          ) : null}
          {user.followers.map((follower) =>
            myfollowings.includes(follower) ? (
              <div className="flex" key={follower}>
                <h3>{follower}</h3>
              </div>
            ) : null
          )}
        </div>
        {myfollowings.includes(user.login) ? (
          <div id="trash" className="flex absolute right-20">
            <button onClick={handleFollow} value="Unfollow" className="border">
              Unfollow
            </button>
          </div>
        ) : (
          <div id="trash" className="flex absolute right-20">
            <button onClick={handleFollow} value="Follow" className="border">
              Follow
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default User;
