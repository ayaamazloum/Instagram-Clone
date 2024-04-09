import './style.css'
import logo from "./../../assets/images/logo.png";
import { useState } from 'react';
import SignupForm from './copmonents/SignupForm';
import LoginForm from './copmonents/LoginForm';

const Auth = ({ handleUserLogged }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleIsLogin = (value) => { setIsLogin(value) }
    
    return (
        <div className='flex column center gap-10 mt-20 mb-20'>
          <div className='box border flex column center gap-20'>
              <img src={logo} className='auth-logo' alt='instagram' />
                {isLogin ? <LoginForm handleUserLogged={handleUserLogged} /> : <SignupForm handleUserLogged={handleUserLogged} />}
          </div>
          <div className='box border flex column center gap-20'>
          {isLogin ?
            (<p>Don't have an account? <span onClick={() => { handleIsLogin(false) }} className='secondary-text link'>Sign up</span></p>)
            :(<p>Have an account? <span onClick={() => { handleIsLogin(true) }} className='secondary-text link'>Log in</span></p>)
          }
          </div>
        </div>
  )
}

export default Auth