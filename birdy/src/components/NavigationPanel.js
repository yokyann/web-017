import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Login from "./Login";
import Signin from "./SignIn";
import axios from "axios";
import jwt_decode from "jwt-decode";

function NavigationPanel(props) {
  
  const [page, setPage] = useState("login_page");
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({});


  function getUserfromToken(token) {
    try {
      const decodedToken = jwt_decode(token);
      console.log("DECODED TOKEN", decodedToken)
      return decodedToken.myuser;
    } catch (err) {
      console.error(err);
      return null;
    }
  }



  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const myuser = getUserfromToken(token);
  
      if (myuser) {
        setUser(myuser);
        getConnected();
      } 
    } else {
      setConnected(false);
    }
  }, []);
  

  function getConnected() {
    setPage("home_page");
    setConnected(true);
  }
      

  function setLogout(){
    setPage("login_page")
    setConnected(false);
  }
  

  const handleSignIn = () => {
    setPage("signin_page");
  };

  const handleLogin = () => {
    setPage("login_page");
  };

console.log("connected",connected)
  return (
    <div>
      <nav id="navigation_pan">
        
        {connected && page==="home_page" ? (
          <Home user={user}                     
          setPage={setPage}
          page={page}
          setLogout={setLogout} />
        ) : (
          // center the page
          <div className="flex justify-center items-center w-full p-16 bg-gray-100 xl:px-20 h-screen">
            <div className="">
              {/* page divisé en 2 colonne */}
              <div className="flex flex-col items-center md:flex-row">
                {/* colonne 1 */}
                <div className="w-full space-y-5 md:w-3/5 md:pr-16">
                  <p className="font-medium text-blue-500 uppercase">
                    Huynh Yok Yann et Ding Kevin
                  </p>
                  <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                    LU3IN017 - Projet Web - Birdy
                  </h2>
                  <p className="text-xl text-gray-600 md:pr-16">
                    Bienvenue sur Birdy, un clone de twitter en ReactJS
                  </p>
                </div>
                {/* colonne 2 */}
                <div className="w-full mt-16 md:mt-0 md:w-2/5">
                  <div className="h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl rounded-lg">
                    {page === "signin_page" ? (
                      <Signin handleLogin={handleLogin} 
                        getUserfromToken={getUserfromToken}
                        setUser={setUser}
                        getConnected={getConnected}/>
                    ) : (
                      page === "login_page" ?(
                      <Login
                        handleSignIn={handleSignIn}
                        getUserfromToken={getUserfromToken}
                        setUser={setUser}
                        getConnected={getConnected}
                        setPage={setPage}
                      />
                      ) : (<div></div>)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavigationPanel
