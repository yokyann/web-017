import { useState } from "react";

function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const getLogin = (evt) => {
    setLogin(evt.target.value);
  };
  const getPassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
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
          <input className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500" id="login" onChange={getLogin} />
        </div>
        <div>
          <label htmlFor="mdp">Mot de passe</label>
          <input className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500" type="password" id="mdp" onChange={getPassword} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 py-2">
          <button className="btn border p-2 rounded bg-blue-100 hover:bg-blue-200" type="submit">Log In</button>
          <button className="btn border p-2 rounded bg-red-100 hover:bg-red-200" type="reset">Annuler</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
