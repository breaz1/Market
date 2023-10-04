import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputLabel, Input, FormGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const AdminContacts = () => {
  const dispatch = useDispatch()

  const [showOrder, setShowOrder] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleEmailChange (event) {
    setEmail(event.target.value)
  }
  function handlePhoneChange (event) {
    setPhone(event.target.value)
  }

  const OnSubmit1 = (event) => {
    event.preventDefault()
    axios.post('', { type: 'email', content: email }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Success' + res.data)
        showOrderHandler()
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  const OnSubmit2 = (event) => {
    event.preventDefault()
    axios.post('', { type: 'phone_number', content: phone }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Success' + res.data)
        showOrderHandler()
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  const showOrderHandler = () => {
    setShowOrder(true)
    setTimeout(() => {
      setShowOrder(false)
    }, 7000)
  }

  return (
        <div>
            <form className='admin-form' onSubmit={OnSubmit1}>
                <FormGroup className='admin-form'>
                    <h1 className="auth-title">Изменить почту</h1>
                    <input placeholder='название' id="name" onChange={handleEmailChange} value={email} />
                    <button className="admin-confirm-button">Изменить</button>
                </FormGroup>
            </form>
            <form className='admin-form' onSubmit={OnSubmit2}>
                <FormGroup className='admin-form'>
                    <h1 className="auth-title">Изменить телефон</h1>
                    <input placeholder='название' id="name" onChange={handlePhoneChange} value={phone} />
                    <button className="admin-confirm-button">Изменить</button>
                </FormGroup>
            </form>
            {showOrder && (
                     <div className="notification slideIn">Контакт изменен</div>
            )}
        </div>
  )
}

export { AdminContacts }
