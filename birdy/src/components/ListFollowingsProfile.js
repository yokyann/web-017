import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
function ListFollowingsProfile(props){
    const followings = props.followings
    return(
        <div>
        {followings.map((following) => (
          <div>{following} <UnfollowButton setMyfollowings={props.setMyfollowings}
          me={props.me}
          page={props.page}
          setFollowersv={props.setFollowersv}
          user={following}
          getuser={props.getuser}
          myfollowings={props.followings}/></div>
        ))}
      </div>
    )
}

export default ListFollowingsProfile;