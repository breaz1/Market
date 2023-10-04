import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import '../styles/cart.css'
import { AdminHeadder } from '../components/admin/headder'
import { AdminProduct } from '../components/admin/products'
import { AdminCategory } from '../components/admin/categories'
import { AdminOrder } from '../components/admin/order'
import { AdminSwitchInfo } from '../components/admin/switchInfo'
import { getIsAuth } from '../features/user/userSlice'
import { FormGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

function Admin () {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('product')
  const user = useSelector((state) => state.user)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    dispatch(getIsAuth())
  }, [dispatch])
  return (
      <div>
        {console.log(user)}
        {user
          ? (
        <div>
        <AdminHeadder activeTab={activeTab} handleTabClick={handleTabClick}/>
        <div className="container">
            <div>
                {activeTab === 'product' && <AdminProduct />}
                {activeTab === 'category' && <AdminCategory/>}
                {activeTab === 'order' && <AdminOrder />}
                {activeTab === 'switch' && <AdminSwitchInfo />}
            </div>
            </div>
        </div>
            )
          : (
          <div className="reg-index" >
            <div className="overlay">
                <div className="w">
                <FormGroup className='reg-form popup'>
                 <h1>Доступ закрыт</h1>
                </FormGroup>
                </div>
              </div>
            </div>)}
      </div>
  )
}

export default Admin
