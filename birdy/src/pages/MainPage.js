import { useCallback, useState } from "react";
import NavigationPanel from "../components/NavigationPanel";
import Signin from "../components/SignIn";
import "../index.css";

function MainPage(props) {



  return (
    // <Feed></Feed>
    <NavigationPanel></NavigationPanel>
    
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
