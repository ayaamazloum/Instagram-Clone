import { useState } from "react"
import sendRequest from "../../../core/tools/remote/request"
import { requestMehods } from "../../../core/enums/requestMethods"

const LoginForm = ({handleUserLogged}) => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [error, setError] = useState('');

  const login = async () => {
    if (error !== '') {
      setError('Please fill in all the fields.');
      return;
  }
  setError('');
  try {
      const res = await sendRequest(requestMehods.POST, "/login", credentials);
      if (res.data.status === 'success') {
          handleUserLogged(true);
          localStorage.setItem('token', res.data.authorisation.token);
      }
  } catch (e) {
      console.error(e);
      setError('Incorrect credentials')}
  }
  return (
    <>
      <div className='inputs flex column center gap-10'>
        <input onChange={(e) => { setCredentials({ ...credentials, login: e.target.value }); }}
          className='auth-input border semi-rounded' type='text' placeholder='Email or username' />
        <input onChange={(e) => {
          setCredentials({ ...credentials, password: e.target.value });
          e.target.value.length < 6 ? setError('Short password') : setError('')}}
          className='auth-input border semi-rounded' type='password' placeholder='Password' />
        {error !== '' && <p className="primary-text xsm-text self-start mb-10">{error}</p>}
      </div>
      <p className='light-text text-center xsm-text blue-text link'>Forgotten your password?</p>
      <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={login}>Log in</button>
    </>
  )
}

export default LoginForm