import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!login || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/user/login", {
        login,
        password,
      });
  
      if (response.data) {
        const token = response.data;
        localStorage.setItem("token", token);
  
        const myuser = props.getUserfromToken(token);
        if (myuser) {
          props.setUser(myuser);
          props.getConnected();
        }
      } else {
        setErrorMessage("Invalid login or password.");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  
  
  return (
    <div>
      <form
        onSubmit={handleLoginFormSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="text-center my-2">
          <h1 className="text-4xl font-semibold">Login</h1>
        </div>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-10/12 mb-6">
          <div>
            <label htmlFor="login">Login</label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              id="login"
              value={login}
              onChange={(evt) => setLogin(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              type="password"
              id="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 py-2">
            <button
              type="submit"
              className="btn border p-2 rounded bg-blue-100 hover:bg-blue-200"
            >
              Log In
            </button>
            <button
              type="reset"
              className="btn border p-2 rounded bg-red-100 hover:bg-red-200"
            >
              Cancel
            </button>
          </div>
          <div>
            <button className="underline text-blue-800">
              Don't have an account yet?
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
