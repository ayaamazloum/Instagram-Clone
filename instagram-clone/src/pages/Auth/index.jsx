import './style.css'
import sendRequest from "../../core/tools/remote/request";
import { requestMehods } from "../../core/enums/requestMethods";
import logo from "./../../assets/images/logo.png";

const Auth = ({ handleLoggingIn }) => {
    const handleSignup = () => { }
  return (
      <div className='page flex column center gap-10 mt-20 mb-20'>
          <div className='box border flex column center gap-20'>
              <img src={logo} className='auth-logo' alt='instagram' />
              <p className='light-text sm-text bold text-center'>Sign up to see photos and videos from your friends.</p>
              <div className='inputs flex column center gap-10'>
                <input className='auth-input border semi-rounded' type='text' placeholder='Email Address' />
                <input className='auth-input border semi-rounded' type='text' placeholder='Full Name' />
                <input className='auth-input border semi-rounded' type='text' placeholder='Username' />
                <input className='auth-input border semi-rounded' type='password' placeholder='Password' />
              </div>
              <p className='light-text text-center xsm-text'>People who use our service may have uploaded your contact information to Instagram.
                  <span className='blue-text'>Learn more</span></p>
              <p className='light-text text-center xsm-text'>By signing up, you agree to our
                  <span className='blue-text'> Terms, Privacy Policy</span> and 
                  <span className='blue-text'> Cookies Policy</span>.</p>
              <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={handleSignup}>Sign Up</button>
          </div>
          <div className='box border flex column center gap-20'>
              <p>Have an account? <span className='secondary-text'>Log in</span></p>
          </div>
    </div>
  )
}

export default Auth