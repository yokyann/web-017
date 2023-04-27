import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationPanel from './Components/NavigationPanel'
import Profile from './pages/Profile'
import MainPage from './pages/MainPage'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import jwt_decode from 'jwt-decode';
import axios from 'axios'

export default function AppRoutes() {
  const [isConnected, setConnect] = useState(false);
  const [userid, setId] = useState("");

  const [pseudo, setPseudo] = useState("default Pseudo")
  const [name, setName] = useState("default Name")
  const [lastname, setLastName] = useState("default Lastname")



  function getUserIdFromToken(token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const id = getUserIdFromToken(token)
      setId(id)
      setConnect(true)
      axios.get("http://localhost:8000/users/id/infos/:user", {
        params: {
          id: id
        }
      })
      .then ( (res) => {
        setUserInfo(res.data.login,res.data.name,res.data.lastname)
      })

    }
  }, [isConnected,userid,pseudo,name,lastname])

  function setUserInfo(pseudo, name, lastname) {
    setPseudo(pseudo)
    setName(name)
    setLastName(lastname)
  }

  function getConnected() {
    setConnect(true)
  }

  function setLogout() {
    setConnect(false)
  }

  function setUserId(id) {
    setId(id)
  }

  return (
    <Routes>

      <Route exact path='/' element={<MainPage isConnected={isConnected} login={getConnected} logout={setLogout}
        userid={userid} setUserId={setUserId}
        pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo}
      />} />

      <Route exact path='/home/profile' element={<Profile isConnected={isConnected} login={getConnected} logout={setLogout}
        userid={userid} setUserId={setUserId}
        pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo} />} />

      <Route exact path='/login' element={<Login isConnected={isConnected} login={getConnected} logout={setLogout}
        userid={userid} setUserId={setUserId}
        pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo} />} />

      <Route exact path='/signup' element={<SignUp isConnected={isConnected} login={getConnected} logout={setLogout}
        userid={userid} setUserId={setUserId}
        pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo} />} />

    </Routes>
  )

}