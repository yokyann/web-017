import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passOK, setPassOK] = useState(false);

  const getLogin = (evt) => {
    setLogin(evt.target.value);
  };
  const getPassword = (evt) => {
    setPassword(evt.target.value);
  };

  const getSignInPage = (evt) => {
    props.getSignin();
  };
  const getHomePage = (evt) => {
    props.getConnected();
  };
  const setUserInfos = (data) => {
    props.setUserInfos(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login || !password) {
      alert("Veuillez remplir tous les champs");
    } else {
      try {
        console.log(" params : ", login, password);
        await axios
          .post("http://localhost:4000/api/user/login", {
            login,
            password,
          })
          .then((res) => {
            console.log("axios.post('/user/login') : ", res.data);
            setUserInfos({ login, password });
            setPassOK(true);
          });
      } catch (error) {
        console.log("error : ", error);
      }
    }
  };

  return (
    <div>
      <form
        method="POST"
        action=""
        className="flex flex-col items-center justify-center "
      >
        <div className="text-center my-2">
          <h1 className="text-4xl font-semibold ">Login</h1>
        </div>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-10/12 mb-6">
          <div>
            <label htmlFor="login">Login</label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              id="login"
              onChange={getLogin}
            />
          </div>
          <div>
            <label htmlFor="mdp">Mot de passe</label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              type="password"
              id="mdp"
              onChange={getPassword}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 py-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn border p-2 rounded bg-blue-100 hover:bg-blue-200"
            >
              Log In
            </button>
            <button
              className="btn border p-2 rounded bg-red-100 hover:bg-red-200"
              type="reset"
            >
              Annuler
            </button>
          </div>
          <div>
            <button onClick={getSignInPage} className="underline text-blue-800">
              Pas encore de compte ?
            </button>
          </div>
          {passOK ? getHomePage() : <p></p>}
        </div>
      </form>
    </div>
  );
}

export default Login;
