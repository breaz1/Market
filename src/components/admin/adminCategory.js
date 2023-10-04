import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteCategories } from '../../features/category/categorySlice'

const ACategory = ({ data }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const deleteItem = () => {
    console.log('click')
    dispatch(deleteCategories(data._id))
    setShow(false)
  }
  if (!show) { return null }
  return (
    <div className="">
       <div className="admin-category">
      <Link to={`/catalog/${data._id}/${data.name}`} ><p className="admin-category-title">{data.name}</p></Link>
        <div>
        <p className="admin-id">{data._id}</p>
        <button className="delete-item" onClick={deleteItem}>
            <FaTrash/>
            <p className="delete">Удалить</p>
          </button>
        </div>
        <p className="admin-category-parent">{data.parent}</p>
        </div>
        <p></p>
    </div>
  )
}

export { ACategory }
