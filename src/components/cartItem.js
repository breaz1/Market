import React, { useState, useEffect } from 'react'
import '../styles/category.css'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteItemFromCart } from '../features/cart/cartSlice'

const CartItem = ({ data, setTotalPrice }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const product = useSelector((state) => state.product.products)
  const item = product.data && product.data.filter((product) => product._id == data.product)
  const [count, setCount] = useState(1)

  const [showNotification, setShowNotification] = useState(false)
  const [price, setPrice] = useState(0)
  const [isDeleted, setIsDeleted] = useState(false)
  const isUserAuthorized = !!user._id

  useEffect(() => {
    if (item && !(item[0].count >= data.count)) {
      if (isUserAuthorized) {
        const raz = item[0].count - data.count
        dispatch(deleteItemFromCart({ cartId: data._id, count: raz }))
      } else {
        const raz = item[0].count - data.count
        console.log(raz)
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const existingItemIndex = cartData.findIndex(item => item.product === data.product)

        if (existingItemIndex !== -1) {
          cartData[existingItemIndex].count += raz
        } else {
          cartData.push({ product: data.product, count: raz })
        }

        localStorage.setItem('cart', JSON.stringify(cartData))
        setTotalPrice()
        setCount(item[0].count)
        setPrice(item[0].price * item[0].count)
      }
    }
    if (item) {
      setCount(item[0].count >= data.count ? data.count : item[0].count)
      setPrice(item && item[0].price * data.count)
      console.log(item)
    }
  }, [])

  if (!item) { return null }

  const handleCountChange = (event) => {
    const value = event.target.value
    const numericValue = parseInt(value)
    if (!isNaN(numericValue)) {
      if (isUserAuthorized) {
        if (numericValue > count) {
          if (item[0].count < numericValue) {
            console.log(numericValue)
            showNotificationHandler()
            const raz = item[0].count - count
            console.log(raz)
            dispatch(addToCart({ product: item[0]._id, count: raz, userId: user._id }))
            setCount(item[0].count)
            setPrice(item[0].price * (item[0].count))
          } else {
            dispatch(addToCart({ product: item[0]._id, count: numericValue - count, userId: user._id }))
            setCount(numericValue)
            setPrice(item[0].price * (numericValue))
          }
        } else {
          dispatch(deleteItemFromCart({ cartId: data._id, count: count - numericValue }))
          setCount(numericValue)
          setPrice(item[0].price * (numericValue))
        }
      } else {
        if (numericValue > count) {
          if (item[0].count < numericValue) {
            console.log(numericValue)
            showNotificationHandler()
            const raz = item[0].count - count
            console.log(raz)
            const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
            const existingItemIndex = cartData.findIndex(item => item.product === data.product)

            if (existingItemIndex !== -1) {
              cartData[existingItemIndex].count += raz
            } else {
              cartData.push({ product: data.product, count: raz })
            }

            localStorage.setItem('cart', JSON.stringify(cartData))
            setTotalPrice()
            setCount(item[0].count)
            setPrice(item[0].price * item[0].count)
          } else {
            const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
            const existingItemIndex = cartData.findIndex(item => item.product === data.product)

            if (existingItemIndex !== -1) {
              cartData[existingItemIndex].count += numericValue - count
            }

            localStorage.setItem('cart', JSON.stringify(cartData))
            setCount(numericValue)
            setPrice(item[0].price * numericValue)
            setTotalPrice()
          }
        } else {
          const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
          const existingItemIndex = cartData.findIndex(item => item.product === data.product)

          if (existingItemIndex !== -1) {
            cartData[existingItemIndex].count -= count - numericValue
          } else {
            cartData.push({ product: data.product, count: numericValue })
          }

          localStorage.setItem('cart', JSON.stringify(cartData))
          setCount(numericValue)
          setPrice(item[0].price * numericValue)
          setTotalPrice()
        }
      }
    } else {

    }
  }

  const showNotificationHandler = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }

  const handleCountDecrease = () => {
    if (count == 1) {
      setCount(1)
    } else {
      console.log(isUserAuthorized)
      if (isUserAuthorized) {
        setCount(count - 1)
        setPrice(item[0].price * (count - 1))
        dispatch(deleteItemFromCart({ cartId: data._id, count: 1 }))
      } else {
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const existingItemIndex = cartData.findIndex(item => item.product === data.product)

        if (existingItemIndex !== -1) {
          // If the product already exists, increase the count
          cartData[existingItemIndex].count -= 1
        }
        setCount(count - 1)
        setPrice(item[0].price * (count - 1))
        localStorage.setItem('cart', JSON.stringify(cartData))
        setTotalPrice()
      }
    }
  }
  const changeCount = () => {
    if (isUserAuthorized) {
      if (item[0].count > count) {
        setCount(count + 1)
        setPrice(item[0].price * (count + 1))
        dispatch(addToCart({ product: data.product, count: 1, userId: user._id }))
      } else {
        showNotificationHandler()
      }
    } else {
      if (item[0].count > count) {
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const existingItemIndex = cartData.findIndex(item => item.product === data.product)

        if (existingItemIndex !== -1) {
          // If the product already exists, increase the count
          cartData[existingItemIndex].count += 1
        } else {
          // If the product doesn't exist, add it as a new item
          cartData.push({ product: data.product, count: 1 })
        }
        setCount(count + 1)
        setPrice(item[0].price * (count + 1))
        localStorage.setItem('cart', JSON.stringify(cartData))
        setTotalPrice()
      } else {
        showNotificationHandler()
      }
    }
  }

  if (isDeleted) {
    return null // Stop rendering the component if the item is deleted
  }

  if (!item) {
    return (
    <div>
        <div className="container up">
        <div className="spin-wrapper">
          <div className="spinner">
          </div>
        </div>
        </div>
    </div>
    )
  }
  const deleteItem = () => {
    if (isUserAuthorized) {
      setCount(0)
      setIsDeleted(true)
      setPrice(0)
      dispatch(deleteItemFromCart({ cartId: data._id, count }))
      setTotalPrice()
    } else {
      if (localStorage.getItem('cart')) {
        const cartData = JSON.parse(localStorage.getItem('cart'))
        const existingItemIndex = cartData.findIndex(item => item.product === data.product)
        if (existingItemIndex !== -1) {
          setIsDeleted(true)
          cartData.splice(existingItemIndex, 1)
          localStorage.setItem('cart', JSON.stringify(cartData))
        }
      }
    }
    setTotalPrice()
  }

  return (
        <div className="tovar-item">
          {console.log(item)}
              <Link to={`/product/${item[0]._id}/${item[0].name}`}>
                <img className="tovar-img" src={'data:image/png;base64,' + item[0].photo}/>
              </Link>
                <div>
                  <h1 className="cart-item-title">{item[0].name}</h1>
                  <button className="delete-item" onClick={deleteItem}>
                    <FaTrash/>
                    <p className="delete">Удалить</p>
                  </button>
                </div>
                <div className="cart-count-item">
                  <button className="cart-count-button left" onClick={handleCountDecrease}><FaMinus /></button>
                  <input className="cart-count-input"
                  type="number"
                  value={count}
                  onChange={handleCountChange}></input>
                  <button className="cart-count-button" onClick={() => changeCount()}><FaPlus/></button>
                </div>
                 <p className="cart-price">{price}₽</p>
                 {showNotification && (
                  <div className="notification slideIn">В наличии только {item[0].count}шт</div>
                 )}
        </div>
  )
}
export { CartItem }
