import Login from "./Login";
import Logout from "./Logout";
import { useState } from "react";
import Signin from "./SignIn";
import Home from "../pages/Home";

function NavigationPanel(props) {
  const [page, setPage] = useState("signin_page");
  const [connect, setConnect] = useState(false);

  const getConnected = () => {
    setConnect(true);
    setPage("message_page");
  };

  const setLogout = () => {
    setConnect(false);
    setPage("signin_page");
  };

  const getSignIn = () => {
    setPage("signin_page");
  };

  const getLogin = () => {
    setPage("login_page");
  };

  return (
    <div>
      <nav id="navigation_pan">
        {connect ? (
          <Home></Home>
        ) : (

          page === "signin_page" ? (
            <Signin getLogin={getLogin} ></Signin>
          ) : (
            <Login getSignin={getSignIn}></Login>
          )

        )}

      </nav>
    </div>
  );
}
export default NavigationPanel;
