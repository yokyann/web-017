import Logout from "../components/Logout";

function Home(props) {
  return (
    <div>
      <h1>Home</h1>
        <Logout logout={props.logout}></Logout>
    </div>
  );
}
export default Home;