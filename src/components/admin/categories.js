import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import { addCategory } from '../../features/category/categorySlice'
import { InputLabel, Input, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { ACategory } from './adminCategory'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin.css'

const AdminCategory = () => {
  const dispatch = useDispatch()
  const [name, setLogin] = useState('')
  const [parent, setParent] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = useSelector((state) => state.category.categories)

  function handleNameChange (event) {
    setLogin(event.target.value)
  }
  function handleParentChange (event) {
    setParent(event.target.value)
  }

  const handleSignIn = () => {
    dispatch(addCategory({ name, parent }))
    setSuccess(true)
  }
  return (
      <div>
        <FormGroup className='admin-form'>
            <h1 className="auth-title">Добавление категории</h1>
                <FormControl>
                    <InputLabel htmlFor="name">Название категории</InputLabel>
                    <Input id="name" aria-describedby="name" onChange={handleNameChange} value={name}/>
                </FormControl>
                <FormControl margin={'dense'}>
                    <InputLabel htmlFor="parent">Родитель категории</InputLabel>
                    <Input id="parent" aria-describedby="parent" onChange={handleParentChange} value={parent}/>
                </FormControl>
                <button className="admin-confirm-button" onClick={handleSignIn}>Добавить категорию</button>
            </FormGroup>
                <div className="">
                    <div className="admin-catalog catalog-catalog">
                        <div className="">
                            <div className="admin-category">
                            <p className="admin-category-title">НАЗВАНИЕ КАТЕГОРИИ</p>
                            <p>ID категории</p>
                            <p className="admin-category-parent more">Родитель</p>
                        </div>
                    </div>
                    {categories.data && categories.data.map((category) =>
                    <ACategory key={category._id} data={category} />)}
                </div>
            </div>
      </div>
  )
}

export { AdminCategory }
