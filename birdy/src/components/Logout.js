function Logout(props) {
  function logoutHandler() {
    console.log("click on logouts")
    localStorage.removeItem('token');
    props.setLogout();
  } 

  return (
    <div>
      <button className="text-white " onClick={logoutHandler} >logout</button>
    </div>
  );
}
export default Logout;
