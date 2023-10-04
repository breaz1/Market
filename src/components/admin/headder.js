import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../features/product/productSlice'
import { getIsAuth } from '../../features/user/userSlice'
import { getCart } from '../../features/cart/cartSlice'
import { getFavorites } from '../../features/favorite/favoriteSlice'
import { getCategories } from '../../features/category/categorySlice'

const AdminHeadder = ({ activeTab, handleTabClick }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIsAuth())
    dispatch(getCategories())
    dispatch(getCart())
    dispatch(getProducts())
    dispatch(getFavorites())
  }, [dispatch])

  return (
      <div>
        <div className="header">
          <nav className="header cont1">
            <Link to="/" className="el logo">
              <div className="contact">
                <img className="comp-logo" src="/img/logo.png" alt="Логотип" />
              </div>
            </Link>

            <p onClick={() => handleTabClick('product')}className={`el ${activeTab === 'product' ? 'adminActive' : ''}`}>Добавить<br />товар</p>
            <p onClick={() => handleTabClick('category')}className={`el ${activeTab === 'category' ? 'adminActive' : ''}`}>Добавить<br />категорию</p>
            <p onClick={() => handleTabClick('order')}className={`el ${activeTab === 'order' ? 'adminActive' : ''}`}>Посмотреть <br />заказы</p>
            <p onClick={() => handleTabClick('switch')}className={`el ${activeTab === 'switch' ? 'adminActive' : ''}`}>Изменить <br />данные</p>
          </nav>
          <div className="line"></div>
        </div>
      </div>
  )
}

export { AdminHeadder }
