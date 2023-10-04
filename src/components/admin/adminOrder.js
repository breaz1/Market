import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategories } from '../../features/category/categorySlice'
import axios from 'axios'
const AOrder = ({ data }) => {
  const product = useSelector((state) => state.product.products)
  const products = product && product.data.filter((product) => data.products.some(data => product._id == data))

  const [show, setShow] = useState(true)
  const deleteItem = async (id) => {
    try {
      const response = await axios.post('', { order: id }, { withCredentials: true })
      setShow(false)
    } catch (error) {
      console.log(error)
    }
  }
  if (!show) { return null }
  if (!products) {
    return null
  }
  return (
    <div>
    <div className="">
      {console.log(products)}
        <div className="admin-category">
            <p className="admin-category-parent1">{data.buyerName} {data.buyerLastName}</p>
            <div>
            <p className="admin-category-parent1">{data.buyerPhone}</p>
            </div>
            <p className="admin-category-parent1">{data.buyerEmail}</p>
            <p className="admin-category-parent1">{data.deliveryCity}</p>
            <p className="admin-category-parent1">{data.deliveryRegion}</p>
            <div className="admin-category-parent1">
            {products && Object.keys(products).map(item =>
                <p>{products[item].name} - {data.count[item]}</p>
            )}</div>
            <button className="delete-item" onClick={() => deleteItem(data._id)}>
                <FaTrash/>
            </button>
            </div>
            <p></p>
        </div>
        <div className="line"></div>
</div>
  )
}

export { AOrder }
