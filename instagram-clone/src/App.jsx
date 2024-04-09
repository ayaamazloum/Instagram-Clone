import "./styles/utilities.css";
import "./styles/colors.css";

import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

const App = () => {
  const [userLogged, setUserLogged] = useState(localStorage.getItem('token'));

  const handleUserLogged = (value) => { 
    setUserLogged(value);
  }

  return (
    <div className="app sm-text">
      <BrowserRouter>
        {userLogged ? (
          <Routes>
            <Route path="/" element={<Home handleUserLogged={handleUserLogged} />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
          </Routes>)
          : (<Auth handleUserLogged={handleUserLogged} />)
        }
      </BrowserRouter>
    </div>  
  );
}

export default App;
