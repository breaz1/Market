import FormControl from '@mui/material/FormControl'
import { InputLabel, Input, FormGroup } from '@mui/material'

import { useState, useRef, useEffect } from 'react'

import { getAuth } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

import useInput from '../hooks/useInput'

function SignUp ({ handleCloseSignUp }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [success, setSuccess] = useState(false)
  const [login, setLogin] = useInput('')
  const [password, setPassword] = useInput('')
  const [checkPass, setCheckPass] = useState(false)

  function handleLoginChange (event) {
    setLogin(event.target.value)
  }

  function handlePasswordChange (event) {
    setPassword(event.target.value)
  }
  const successSignUp = () => {
    setSuccess(false)
    navigate('/')
  }
  const handleSignIn = () => {
    dispatch(getAuth({ login, password })).then((response) => { response.error ? setSuccess(true) : successSignUp() })
      .catch((res) => {})
  }
  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckPass(true)
      console.log(checkPass)
    } else {
      setCheckPass(false)
      console.log(checkPass)
    }
  }

  return (
    <FormGroup className='reg-form popup'>
      <FaTimes className="close-button" onClick={handleCloseSignUp}/>
      <h1 className="auth-title">Авторизация</h1>
        <FormControl>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input id="login" aria-describedby="login" onChange={handleLoginChange} value={login}/>
        </FormControl>
        {!checkPass
          ? <FormControl margin={'dense'}>
            <InputLabel htmlFor="password" type='password'>Password</InputLabel>
            <Input id="password" aria-describedby="password" type='password' onChange={handlePasswordChange} value={password}/>
        </FormControl>
          : <FormControl margin={'dense'}>
            <InputLabel htmlFor="password" type='password'>Password</InputLabel>
            <Input id="password" aria-describedby="password" type='text' onChange={handlePasswordChange} value={password}/>
        </FormControl>}
        <div className='showPass'>
              <input type='checkbox' className='checkPass' onChange={handleChange}/>
              <p>Показать пароль</p>
            </div>
        <button className="auth-confirm-button" onClick={handleSignIn}>Войти</button>
        <Link to="/register"><p>Зарегистрироваться</p></Link>
        {success && (<p className="error">Проверьте логин или пароль</p>)}
    </FormGroup>
  )
}

export { SignUp }
