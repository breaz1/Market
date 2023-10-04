import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const ASlider = ({ data }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const deleteItem = async () => {
    setShow(false)
    try {
      const response = await axios.post('', { news: data._id }, { withCredentials: true })
    } catch (error) {
      console.log(error)
    }
  }
  if (!show) { return null }
  return (
    <div className="">
       { console.log(data)}
       <div className="admin-category">
                <img src={'data:image/png;base64,' + data.content} alt={data.content} className="tovar-image" />
                <button className="delete-item" onClick={deleteItem}>
                    <FaTrash/>
                    <p className="delete">Удалить</p>
                </button>
        </div>
    </div>
  )
}

export { ASlider }
