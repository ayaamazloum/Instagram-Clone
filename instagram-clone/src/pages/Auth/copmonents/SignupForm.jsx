import { useState } from "react"
import sendRequest from "../../../core/tools/remote/request"
import { requestMehods } from "../../../core/enums/requestMethods"

const SignupForm = ({handleUserLogged}) => {
    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
    });
    const [error, setError] = useState('');
    
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    const signup = async () => {
        if (errors.email !== '' || errors.name !== '' || credentials.username === '' || errors.password !== '') {
            setError('Please fill in all the fields.');
            return;
        }
        setError('');
        try {
            const res = await sendRequest(requestMehods.POST, "/register", credentials);
            if (res.data.status === 'success') {
                handleUserLogged(true);
                localStorage.setItem('token', res.data.authorisation.token);
            }
        } catch (e) { setError(e.response.data.message.split(".")[0]);}
    }
  return (
      <>
        <p className='light-text sm-text bold text-center'>Sign up to see photos and videos from your friends.</p>
        <div className='inputs flex column center gap-10'>
              <input onChange={(e) => {
                    setCredentials({ ...credentials, email: e.target.value });
                    setErrors({...errors, email: emailRegex.test(e.target.value) ? '' : 'Invalid email address' });}}
                  className='auth-input border semi-rounded' type='text' placeholder='Email Address' />
              {errors.email !== '' && <p className="primary-text xsm-text self-start mb-10">{errors.email}</p>}
              
              <input onChange={(e) => {
                  setCredentials({ ...credentials, name: e.target.value })
                  setErrors({...errors, name: e.target.value.split(" ")[1] ? '' : 'Enter your full name' });}}
                  className='auth-input border semi-rounded' type='text' placeholder='Full Name' />
              {errors.name !== '' && <p className="primary-text xsm-text self-start mb-10">{errors.name}</p>}

              <input onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }}
                  className='auth-input border semi-rounded' type='text' placeholder='Username' />
              
              <input onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                  setErrors({...errors, password: e.target.value.length > 5 ? '' : 'Short password' });}}
                  className='auth-input border semi-rounded' type='password' placeholder='Password' />
              {errors.password !== '' && <p className="primary-text xsm-text self-start mb-10">{errors.password}</p>}

              {error !== '' && <p className="primary-text xsm-text self-start mb-10">{error}</p>}
        </div>
        <p className='light-text text-center xsm-text'>People who use our service may have uploaded your contact information to Instagram.
            <span className='blue-text link'>Learn more</span></p>
        <p className='light-text text-center xsm-text'>By signing up, you agree to our
            <span className='blue-text link'> Terms, Privacy Policy</span> and 
            <span className='blue-text link'> Cookies Policy</span>.</p>
            <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={signup}>Sign Up</button>
      </>
  )
}

export default SignupForm