import "./styles/utilities.css";
import "./styles/colors.css";

import React, {useState} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
  const [logged, setIsLogged] = useState(localStorage.getItem('token'));

  const handleLoggingIn = (value) => { 
    setIsLogged(value);
  }

  return (
    <div className="app sm-text">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={logged ? <Home /> : <Auth handleLoggingIn={handleLoggingIn} />} />
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
