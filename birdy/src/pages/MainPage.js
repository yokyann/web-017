import { useState } from "react";
import NavigationPanel from "../components/NavigationPanel";
import Signin from "../components/SignIn";

function MainPage(props) {
  const [isConnected, setConnect] = useState(false);
  const [page, setPage] = useState("signin_page");

  const getConnected = () => {
    setConnect(true);
    setPage("message_page");
  };

  const setLogout = () => {
    setConnect(false);
    setPage("signin_page");
  };

  return (
    <div>
      {page === "signin_page" ? (
        <Signin />
      ) : (
        <NavigationPanel
          login={getConnected}
          logout={setLogout}
          isConnected={isConnected}
        />
      )}
      ,→
    </div>
  );
}
export default MainPage;
