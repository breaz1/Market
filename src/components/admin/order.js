import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { AOrder } from './adminOrder'

const AdminOrder = () => {
  const [ordersData, setOrdersData] = useState([])
  const [show, setShow] = useState(true)

  useEffect(() => {
    fetchOrdersData()
  }, []) // Fetch the data when the component mounts

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setOrdersData(response.data) // Save the partners data in state
    } catch (error) {
      console.log(error)
    }
  }

  if (!show) { return null }

  return (
      <div>
        <div className="">
                    <div className="admin-catalog1 catalog-catalog">
                        <div className="">
                            <div className="admin-category">
                            <p className="admin-category-parent1">фи</p>
                            <p className="admin-category-parent1">телефон</p>
                            <p className="admin-category-parent1">почта</p>
                            <p className="admin-category-parent1">регион</p>
                            <p className="admin-category-parent1">город</p>
                            <p className="admin-category-parent1">заказ</p>
                        </div>
                        <div className="line"></div>
                        {console.log(ordersData)}
                        {ordersData.map((order) =>
                        <AOrder data={order} key={order._id} />)}
                    </div>
                </div>
            </div>
      </div>
  )
}

export { AdminOrder }
