import React, { useState } from 'react'
import '../styles/tovar.css'
import { Headder } from '../components/header'
import '../styles/footer.css'
import { Footer } from '../components/footer'
import { useParams } from 'react-router-dom'
import '../styles/product-card.css'
import { FaPlus, FaMinus } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '../features/cart/cartSlice'

function ProductCard () {
  const params = useParams()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [load, checkLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const isUserAuthorized = !!user._id

  const [showNotification, setShowNotification] = useState(false)
  const [showManager, setShowManager] = useState(false)

  const products = useSelector((state) => state.product.products)
  const product = products.data && products.data.find((product) => product._id === params.productId)

  if (!product) {
    return (
    <div>
      <Headder />
        <div className="container">
        <div className="spin-wrapper">
          <div className="spinner">
          </div>
        </div>
        </div>
      <Footer />
    </div>
    )
  }

  const handleCountChange = (event) => {
    const value = event.target.value
    const numericValue = parseInt(value)

    if (!isNaN(numericValue)) {
      setCount(numericValue)
    }
  }

  const handleCountDecrease = () => {
    if (count === 1) {
      setCount(1)
    } else {
      setCount(count - 1)
    }
  }
  const changeCount = () => {
    const newCount = count + 1
    setCount(newCount)
  }

  const showNotificationHandler = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }

  const showManagerHandler = () => {
    setShowManager(true)
    setTimeout(() => {
      setShowManager(false)
    }, 2000)
  }

  const adToCart = () => {
    if (!isNaN(product.price)) {
      if (isUserAuthorized) {
        dispatch(addToCart({ product: product._id, count, userId: user._id })).then(res => showNotificationHandler())
      } else {
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const existingItemIndex = cartData.findIndex(item => item.product === product._id)
        if (existingItemIndex !== -1) {
          cartData[existingItemIndex].count += 1
        } else {
          cartData.push({ product: product._id, count })
        }
        localStorage.setItem('cart', JSON.stringify(cartData))
        showNotificationHandler()
        console.log(localStorage)
      }
    } else {
      showManagerHandler()
    }
  }

  return (
      <div>
        <Headder />
        {console.log(count)}
        <div className="container">
          <div className="product-card">
            <img src={'data:image/png;base64,' + product.photo} alt={product.name} className="product-image" />
            <div className="product-card-info">
              <h1 className="product-card-title">{product.name}</h1>
              <p className="product-card-description">{product.description}</p>
              <div className="product-line"></div>
              <p className="product-card-price">{product.price}₽</p>
              <div className="product-count">
                  <button className="product-count-changer" onClick={handleCountDecrease}><FaMinus className="product-icons"/></button>
                  <input className="product-count-change"
                  type="number"
                  value={count}
                  onChange={handleCountChange}></input>
                  <button className="product-count-changer" onClick={() => changeCount()}><FaPlus className="product-icons"/></button>
                </div>
                <div className="do-inf">
                  <span className="star">*</span>
                  <p className="do-inf-text">Стоимость доставки будет меняться в зависимости от региона</p>
                </div>
              <button className="confirm-button" onClick={adToCart}>Добавить в корзину</button>
            </div>
          </div>
        </div>
        <Footer />
        {showNotification && (
  <div className="notification slideIn">Ваш товар был добавлен в корзину!</div>
        )}
{showManager && (
            <div className="notification slideIn">Для покупки данного товара свяжитесь с менеджером!</div>
)}
      </div>
  )
}

export { ProductCard }
