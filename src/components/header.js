import React, { useState, useRef, useEffect } from 'react'
import '../styles/headder.css'
import { FormGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { SignUp } from './SignUp'

import { getCategories, addCategory } from '../features/category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/product/productSlice'
import { getIsAuth } from '../features/user/userSlice'
import { getCart } from '../features/cart/cartSlice'
import { getFavorites } from '../features/favorite/favoriteSlice'
import { FaTimes } from 'react-icons/fa'

const Headder = () => {
  const dispatch = useDispatch()
  const signUpRef = useRef()

  useEffect(() => {
    dispatch(getIsAuth())
    dispatch(getCategories())
    dispatch(getCart())
    dispatch(getProducts())
    dispatch(getFavorites())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const [isSignUpOpen, setSignUpOpen] = useState(false)

  const handleSignUpOpen = () => {
    setSignUpOpen(true)
    const mainCategories = document.querySelectorAll('.main-category')
    if (mainCategories) {
      mainCategories.forEach((mainCategory) => {
        mainCategory.style.position = 'static'
      })
    }
    const carousel = document.querySelector('.main-info-news')
    if (carousel) {
      carousel.classList.add('hidden')
    }
  }
  function handleCloseSignUp () {
    setSignUpOpen(false)
  }
  const handleCheckAuthOpen = () => {
    const mainCategories = document.querySelectorAll('.main-category')
    if (mainCategories) {
      mainCategories.forEach((mainCategory) => {
        mainCategory.style.position = 'static'
      })
    }
    const carousel = document.querySelector('.main-info-news')
    if (carousel) {
      carousel.classList.add('hidden')
    }
  }

  useEffect(() => {
    function handleClose (event) {
      if (signUpRef.current && !signUpRef.current.contains(event.target)) {
        handleCloseSignUp()
      }
    }
    document.addEventListener('mousedown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [])

  return (
      <div>
        <div className="header">
          <nav className="header cont1">
            <Link to="/" className="el logo">
              <div className="contact">
                <img className="comp-logo" src="/img/logo.png" alt="Логотип" />
              </div>
            </Link>
            <Link to="/about" className="el">О компании</Link>
            <Link to="/catalog" className="el">Каталог<br />товаров</Link>
            <Link to="/cart" className="el">Корзина</Link>
            {user.name
              ? (
              <Link to="/profile" className="el">Личный кабинет</Link>
                )
              : (
              <button className="el" onClick={() => handleSignUpOpen()}>Вход</button>
                )}
          </nav>
          <div className="line"></div>
        </div>
        {isSignUpOpen &&
        <div className="reg-index" >
          <div className="overlay">
              <div className="w" ref={signUpRef}>
                <SignUp handleCloseSignUp={handleCloseSignUp}/>
              </div>
            </div>
          </div>}
      </div>
  )
}

export { Headder }
