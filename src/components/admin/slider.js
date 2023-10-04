import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import { addCategory } from '../../features/category/categorySlice'
import { InputLabel, Input, FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { ACategory } from './adminCategory'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin.css'
import axios from 'axios'
import { ASlider } from './adminSlider'

const AdminSlider = () => {
  const dispatch = useDispatch()
  const [showOrder, setShowOrder] = useState(false)

  const [sliderData, setSliderData] = useState([])
  useEffect(() => {
    fetchPartnersData()
  }, [])

  const fetchPartnersData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setSliderData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const OnSubmit = (event) => {
    event.preventDefault()
    console.log({ content: event.target.file.files[0] })
    axios.post('', { content: event.target.file.files[0] }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Success' + res.data)
        showOrderHandler()
        fetchPartnersData()
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
            <h1 className="auth-title">Добавление элемента слайдеоа</h1>
                <input placeholder='фото' id="file" aria-describedby="file" type='file' />
                <button className="admin-confirm-button">Добавить слайд</button>
            </FormGroup>
            </form>
            <div className="admin-catalog catalog-catalog">
                        <div className="">
                            <div className="admin-category">
                                <p>слайд</p>
                            </div>
                        </div>
                        {sliderData.map((slide) =>
                        <ASlider key={slide._id} data={slide} />
                        )}
                </div>
                {showOrder && (
                     <div className="notification slideIn">Новость добавлена</div>
                )}
      </div>
  )
}

export { AdminSlider }
