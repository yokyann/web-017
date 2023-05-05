import axios from "axios";
import { useState, useEffect } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

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
            <UnfollowButton setMyfollowings={setMyfollowings} me={me} user={user}/>

          </div>
        ) : (
          <div id="trash" className="flex absolute right-20">
            <FollowButton setMyfollowings={setMyfollowings} me={me} user={user}/>
          </div>
        )}
      </div>
    );
  }
}

export default User;
