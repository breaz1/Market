import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteProducts } from '../../features/product/productSlice'

const AProduct = ({ data }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  const deleteItem = () => {
    console.log('click')
    dispatch(deleteProducts(data._id))
    setShow(false)
  }
  if (!show) { return null }
  return (
    <div className="">
       <div className="admin-category">
       <Link to={`/product/${data._id}/${data.name}`} className="img">
                <img src={'data:image/png;base64,' + data.photo} alt={data.name} className="tovar-image" />
            </Link>
            <div>
                <Link to={`/product/${data._id}/${data.name}`} ><p className="admin-category-title">{data.name}</p></Link>
                <button className="delete-item" onClick={deleteItem}>
                    <FaTrash/>
                    <p className="delete">Удалить</p>
                </button>
            </div>
            <p>{data.price}</p>
        </div>
    </div>
  )
}

export { AProduct }
