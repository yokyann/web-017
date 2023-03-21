function Feed(props) {
  return (
    <div className="flex flex-col items-center md:flex-row">
      {/* colonne 1 side bar */}
      <div className="w-2/6 bg-green-500 h-screen">
        <header>
          <img className="w-12" src="logo512.png"></img>
        </header>
      </div>
      {/* colonne 2 main feed */}
      <div className="w-3/6 bg-blue-500 h-screen"></div>
      {/* colonne 3 Trends for you ?*/}
      <div className="w-2/6 bg-red-500 h-screen">
        <div className="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search here"
          ></input>
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Feed;
