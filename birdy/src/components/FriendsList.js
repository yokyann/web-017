function Friendlist(props) {
  const friends = props.friends;
  return (
    <div className="mt-4 text-white">
      <h1>My Friends :</h1>
      <ul className="">
      {friends.map((friend) => (
        <li className="">{friend}</li>
      ))}
      </ul>
    </div>
  );
}

export default Friendlist;