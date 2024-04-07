const LoginForm = () => {
  const login = () => { }
  return (
    <>
      <div className='inputs flex column center gap-10'>
        <input className='auth-input border semi-rounded' type='text' placeholder='Email or username' />
        <input className='auth-input border semi-rounded' type='password' placeholder='Password' />
      </div>
      <p className='light-text text-center xsm-text blue-text link'>Forgotten your password?</p>
      <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={login}>Log in</button>

    </>
  )
}

export default LoginForm