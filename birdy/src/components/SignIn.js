import { useState, useEffect } from "react";
import "../index.css";
import axios from 'axios'

function Signin(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passOK, setPassOK] = useState(false);

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const getLogin = (evt) => {
    setLogin(evt.target.value);
  };
  const getFirstName = (evt) => {
    setFirstName(evt.target.value);
  };
  const getLastName = (evt) => {
    setLastName(evt.target.value);
  };
  const getPass1 = (evt) => {
    setPass1(evt.target.value);
  };
  const getPass2 = (evt) => {
    setPass2(evt.target.value);
  };

  
  const setUserInfos = (data) => {
    props.setUserInfos(data);
  }

  useEffect(() => {
    setPassword(pass1);
  }, [pass1])

  async function submissionHandler(e){   
     e.preventDefault()

     if (pass1 !== pass2) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (pass1.length < 6) {
      alert("Le mot de passe doit faire au moins 6 caractères");
      return;
    }
    else{
    if ( !firstName || !lastName || !login || !password) {
      alert("Veuillez remplir tous les champs")
      return;
    }
    else{
      try {
        console.log(" params : ", firstName, lastName, login, password)
        await axios.post('http://localhost:4000/api/user/new', {
          firstName, lastName, login, password
        })
        .then((res) => {
          console.log("axios.post('/user/new') : ", res);
          setUserInfos({firstName, lastName, login, password});
          setPassOK(true);
        })
      } catch (error) {
        console.log("error : ", error)
      }
    }
    }
  }

  const getLoginPage = (evt) => {
    props.getLogin();
  };

  const getHomePage = (evt) => {
    props.getConnected();
  };


  return (
    <div>
      <form className="flex flex-col items-center justify-center ">
        <div className="text-center my-2">
          <h1 className="text-4xl font-semibold ">Sign In</h1>
        </div>
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-10/12 mb-6">
          <div className="mb-3">
            <label className="" htmlFor="firstname">
              First name
            </label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              id="firstname"
              placeholder="Enter first name"
              onChange={getFirstName}
            />
          </div>
          <div className="mb-3">
            <label className=" mb-2" htmlFor="lastname">
              Last name
            </label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              id="lastname"
              placeholder="Enter last name"
              onChange={getLastName}
            />
          </div>
          <div className="mb-3">
            <label className=" mb-2" htmlFor="signin_login">
              Login
            </label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              id="signin_login"
              placeholder="Enter pseudo ?"
              onChange={getLogin}
            />
          </div>
          <div className="mb-3">
            <label className=" mb-2" htmlFor="signin_mdp1">
              Password
            </label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              type="password"
              id="signin_mdp1"
              placeholder="Enter password"
              onChange={getPass1}
            />
          </div>
          <div className=" my-2">
            <label className="block mb-2" htmlFor="signin_mdp2">
              Password (2)
            </label>
            <input
              className="my-2 p-2 appearance-none block w-full placeholder-gray-400 rounded border focus:border-teal-500"
              type="password"
              id="signin_mdp2"
              placeholder="Enter password again"
              onChange={getPass2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 py-2">
            <button
              className="btn border p-2 rounded bg-blue-100 hover:bg-blue-200"
              onClick={submissionHandler}
            >
              Sign In
            </button>
            <button
              className="btn border p-2 rounded bg-red-100 hover:bg-red-200"
              type="reset"
            >
              Reset
            </button>
          </div>
          <div>
            <button onClick={getLoginPage} className="underline text-blue-800">Déja un compte ?</button>
          </div>
          {passOK ? (
            getHomePage()
          ) : (
            <p >
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
export default Signin;
