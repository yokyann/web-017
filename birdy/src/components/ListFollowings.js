
function ListFollowings(props){
    const followings = props.followings
    return(
        <div>
        {followings.map((following) => (
          <div>{following}</div>
        ))}
      </div>
    )
}

export default ListFollowings;