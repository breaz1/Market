import React from 'react'
import axios from 'axios'
import { FormGroup } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import { getAuth } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'

function Reg () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useInput('')
  const [email, setEmail] = useInput('')
  const [login, setLogin] = useInput('')
  const [org, setOrg] = useInput('')
  const [pass, setPass] = useInput('')
  const [pass2, setPass2] = useInput('')
  const [success, setSuccess] = useInput(false)
  const [success2, setSuccess2] = useInput(false)
  const [checkPass, setCheckPass] = useInput(false)

  const handleSubmit = (event) => {
    setSuccess(false)
    setSuccess2(false)
    event.preventDefault()
    if (pass != pass2) {
      setSuccess2(true)
      return 0
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('organization', org)
    formData.append('login', login)
    formData.append('password', pass)

    axios.post('', formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
      .then((res) => {
        dispatch(getAuth({ login, password: pass }))
        console.log('Success: ', res.data)

        navigate('/')
      })
      .catch((err) => {
        console.log('Error: ', err)
        setSuccess(true)
        console.log(success)
      })
  }

  return (
    <div>
      <div className="overlay">
        <div className="w">
          <FormGroup className='reg-form popup'>
            <h1 className="auth-title">Регистрация</h1>
            <form onSubmit={(event) => handleSubmit(event)} className="register-form">
              <FormControl>
                <InputLabel htmlFor="name">ФИО</InputLabel>
                <Input id="name" type='text' aria-describedby="name" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl margin={'dense'}>
                <InputLabel htmlFor="email">Электронная почта</InputLabel>
                <Input id="email" type='email' aria-describedby="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl margin={'dense'}>
                <InputLabel htmlFor="login">Логин</InputLabel>
                <Input id="login" type='text' aria-describedby="login" value={login} onChange={(e) => setLogin(e.target.value)} />
              </FormControl>
              <FormControl margin={'dense'}>
                <InputLabel htmlFor="organization">Организация</InputLabel>
                <Input id="organization" aria-describedby="organization" type='text' value={org} onChange={(e) => setOrg(e.target.value)} />
              </FormControl>
              {!checkPass
                ? <FormControl margin={'dense'}>
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <Input id="password" aria-describedby="password" type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
              </FormControl>
                : <FormControl margin={'dense'}>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input id="password" aria-describedby="password" type='text' value={pass} onChange={(e) => setPass(e.target.value)} />
            </FormControl>
              }
              <div className='showPass'>
                <input type='checkbox' className='checkPass' onChange={() => setCheckPass(!checkPass)}/>
                <p>Показать пароль</p>
              </div>
              {!checkPass
                ? <FormControl margin={'dense'}>
                <InputLabel htmlFor="password">Подтвердите пароль</InputLabel>
                <Input id="password2" aria-describedby="password" type='password' value={pass2} onChange={(e) => setPass2(e.target.value)} />
              </FormControl>
                : <FormControl margin={'dense'}>
              <InputLabel htmlFor="password">Подтвердите пароль</InputLabel>
              <Input id="password2" aria-describedby="password" type='text' value={pass2} onChange={(e) => setPass2(e.target.value)} />
            </FormControl>}
              <button type='submit'className="admin-confirm-button">Зарегистрироваться</button>
            </form>
            {console.log(success + 'in code')}
          {success && (<p className="error">Данный пользователь уже существует</p>)}
          {success2 && (<p className="error">Введеные пароли не совпадают</p>)}
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default Reg
