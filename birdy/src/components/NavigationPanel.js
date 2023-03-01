import Login from "./Login";
import Logout from "./Logout";

function NavigationPanel(props) {
  return (
    <div>
      <nav id="navigation_pan">
        {props.isConnected ? (
          <Logout logout={props.logout} />
        ) : (
          <Login login={props.login} />
        )}
      </nav>
    </div>
  );
}
export default Logout;
