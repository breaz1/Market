import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import { InputLabel, Input, FormGroup } from '@mui/material'
import { AProduct } from './adminProduct'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin.css'
import axios from 'axios'

const AdminProduct = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')

  const categories = useSelector((state) => state.category.categories)
  const products = useSelector((state) => state.product.products)

  function handleNameChange (event) {
    setName(event.target.value)
  }
  function handleDescriptionChange (event) {
    setDescription(event.target.value)
  }
  function handlePriceChange (event) {
    setPrice(event.target.value)
  }
  function handleCountChange (event) {
    setCount(event.target.value)
  }

  const OnSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', name) // Append the _id value from the name state variable
    formData.append('description', description)
    formData.append('price', price)
    formData.append('count', count)
    formData.append('category', event.target.category.value)
    formData.append('photo', event.target.file.files[0])
    console.log({ name, category: event.target.category.value, price, count, description, photo: event.target.file.files[0] })
    axios.post('', { name, category: event.target.category.value, price, count, description, photo: event.target.file.files[0] }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Success' + res.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  return (
        <div>
            <form className='admin-form' onSubmit={OnSubmit}>
                <h1 className="auth-title">Добавление продукта</h1>
                <input placeholder='название' id="name" onChange={handleNameChange} value={name} />
                <input placeholder='описание' id="description" onChange={handleDescriptionChange} value={description} />
                <select id="category" name="category">
                    <option value="">Выберите категорию</option>
                    {categories.data && categories.data.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <input placeholder='цена' id="price" onChange={handlePriceChange} value={price} />
                <input placeholder='количество' id="count" onChange={handleCountChange} value={count} />
                <input placeholder='фото' id="file" aria-describedby="file" type='file' />
                <button className="admin-confirm-button">Добавить продукт</button>
            </form>
            <div className="">
                <div className="admin-catalog catalog-catalog">
                    <div className="">
                        <div className="admin-category">
                            <p className="admin-category-title">Фото</p>
                            <p className="admin-category-title">Название товара</p>
                            <p className="admin-category-title">цена</p>
                        </div>
                    </div>
                    {products.data && products.data.map((product) =>
                        <AProduct key={product._id} data={product} />)}
                </div>
            </div>
        </div>
  )
}

export { AdminProduct }
