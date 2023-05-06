function Friendlist(props) {
  const friends = props.friends;
  return (
    <div className="mt-4 text-white">
      <h1>My Followings :</h1>
      {friends.map((friend) => (
        <li className="ml-5">{friend}</li>
      ))}
    
    </div>
  );
}

export default Friendlist;