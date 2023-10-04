import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const APopCat = ({ data }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const deleteItem = async () => {
    try {
      const response = await axios.post('', { category: data._id }, { withCredentials: true })
      setShow(false)
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
            <div>
                <p className="admin-category-title">{data.name}</p>
                <button className="delete-item" onClick={deleteItem}>
                    <FaTrash/>
                    <p className="delete">Удалить</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export { APopCat }
