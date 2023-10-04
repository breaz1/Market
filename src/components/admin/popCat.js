import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputLabel, Input, FormGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APopCat } from './adminPopCategory'

const AdminPopCat = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [showOrder, setShowOrder] = useState(false)

  const [categoriesData, setCategoriesData] = useState([])
  useEffect(() => {
    fetchCategoriesData()
  }, []) // Fetch the data when the component mounts

  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setCategoriesData(response.data) // Save the partners data in state
    } catch (error) {
      console.log(error)
    }
  }

  function handleNameChange (event) {
    setName(event.target.value)
  }

  const OnSubmit = (event) => {
    event.preventDefault()
    console.log({ name, content: event.target.file.files[0] })
    axios.post('http://innovel.online/api/newPopCategory', { name, content: event.target.file.files[0] }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Success' + res.data)
        showOrderHandler()
        fetchCategoriesData()
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
            <form className='admin-form' onSubmit={OnSubmit}>
                <FormGroup className='admin-form'>
                    <h1 className="auth-title">Добавление Популярных категорий</h1>
                    <input placeholder='название' id="name" onChange={handleNameChange} value={name} />
                    <input placeholder='фото' id="file" aria-describedby="file" type='file' />
                    <button className="admin-confirm-button">Добавить категорию</button>
                </FormGroup>
            </form>
            <div className="admin-catalog catalog-catalog">
                <div className="">
                    <div className="admin-category">
                        <p>фото</p>
                        <p>название</p>
                    </div>
                    {/* Render the partners data from the state */}
                    {categoriesData.map((partner) =>
                        <APopCat key={partner._id} data={partner} />
                    )}
                </div>
            </div>
            {showOrder && (
                     <div className="notification slideIn">Категория добавлена</div>
            )}
        </div>
  )
}

export { AdminPopCat }
