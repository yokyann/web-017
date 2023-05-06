import axios from "axios";
import { useState, useEffect } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

function User(props) {
  const user = props.user;
  const me = props.me;
  const [followersv, setFollowersv] = useState([]);
  const [common, setCommon] = useState([]);

  async function getcommon() {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/user/${user.login}`
      );
      console.log("axios.get('/user') : ", res.data);
      setFollowersv(res.data.followers);
      setCommon(
        res.data.followers.filter(
          (follower) =>
            follower !== me.login && props.myfollowings.includes(follower)
        )
      );
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    getcommon();
  }, [props.myfollowings, me.login, props.user.followers]);

  function visitPage(e) {
    console.log("visitPage");
    props.setVisitMe(user);
    props.setPage("visiting");
  }

  if (user.login !== me.login) {
    return (
      <div className="hover:bg-gray-300 flex container mx-auto bg-gray-200 rounded-xl shadow border p-4 m-4">
        <div onClick={visitPage}>
          <h1 className="text-xl">{user.login}</h1>
          {common.length > 0 ? <h2 className="mt-2">Followed by :</h2> : null}
          {common.map((follower) =>
            props.myfollowings.includes(follower) ? (
              <div className="flex" key={follower}>
                <h3>{follower}</h3>
              </div>
            ) : null
          )}
        </div>
        {props.myfollowings.includes(user.login) ? (
          <div id="trash" className="flex absolute right-20 ">
            <UnfollowButton
              setMyfollowings={props.setMyfollowings}
              me={me}
              user={user}
              getuser={props.getuser}
              myfollowings={props.myfollowings}
            />
          </div>
        ) : (
          <div id="trash" className="flex absolute right-20">
            <FollowButton
              setMyfollowings={props.setMyfollowings}
              me={me}
              user={user}
              getuser={props.getuser}
              myfollowings={props.myfollowings}
            />
          </div>
        )}
      </div>
    );
  }
}

export default User;
