function Logout(props) {
  function logoutHandler() {
    props.logout();
  } 

  return (
    <div>
      <button onClick={logoutHandler} >logout</button>
    </div>
  );
}
export default Logout;
