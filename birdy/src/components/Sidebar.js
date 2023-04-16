import Friendslist from "../components/FriendsList";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="px-3 py-4  ">
        <ul className=" ">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3">Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 h-10">Logout</span>
            </a>
          </li>
        </ul>
        {/* contient liste des amis */}
        <div className="mt-4">
          <Friendslist />
        </div>
        <div className="">
          <p className="text-white pt-10">Hi {props.login}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
