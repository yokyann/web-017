import { useCallback, useState } from "react";
import NavigationPanel from "../components/NavigationPanel";
import Signin from "../components/SignIn";
import "../index.css";
import Feed from "./Feed";

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
    // <Feed></Feed>

    // center the page
    <div className="flex justify-center items-center  w-full p-16 bg-gray-100 xl:px-20 h-screen">
      <div className="">
        {/* page divisé en 2 colonne */}
        <div className="flex flex-col items-center md:flex-row">
          {/* colonne 1 */}
          <div className="w-full space-y-5 md:w-3/5 md:pr-16">
            <p className="font-medium text-blue-500 uppercase">
              petit truc fancy
            </p>
            <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
              Un autre titre stylé
            </h2>
            <p className="text-xl text-gray-600 md:pr-16">
              Learn how to engage with your visitors and teach them about your
              mission. We're revolutionizing the way customers and businesses
              interact.
            </p>
          </div>
          {/* colonne 2 */}
          <div className="w-full mt-16 md:mt-0 md:w-2/5">
            <div className="h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl rounded-lg">
              {page === "signin_page" ? (
                // <Signin login={getConnected} />
                <NavigationPanel
                  login={getConnected}
                  logout={setLogout}
                  isConnected={isConnected}
                />
              ) : (
                <NavigationPanel
                  login={getConnected}
                  logout={setLogout}
                  isConnected={isConnected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainPage;

{
  /* <div className="w-full px-8 py-16 bg-gray-100 xl:px-8"> 
       <div className="">
         {page === "signin_page" ? 
           <Signin className="" />
         ) : (
           <NavigationPanel
             login={getConnected}
             logout={setLogout}
             isConnected={isConnected}
           />
         )}
       </div>
     </div>*/
}
