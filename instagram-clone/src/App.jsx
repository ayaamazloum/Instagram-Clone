import "./styles/utilities.css";
import "./styles/colors.css";

import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
  const [userLogged, setUserLogged] = useState(localStorage.getItem('token'));

  const handleUserLogged = (value) => { 
    setUserLogged(value);
  }

  return (
    <div className="app sm-text">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userLogged ? <Home /> : <Auth handleUserLogged={handleUserLogged} />} />
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
