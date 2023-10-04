import React, { useRef, useState, useEffect } from 'react'
import '../styles/tovar.css'
import { FaCheck, FaEye, FaHeart, FaTimes, FaPlus, FaMinus } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { addToFavrorite } from '../features/favorite/favoriteSlice'
import { ProductCard } from './productCard'

import axios from 'axios'
import InputMask from 'react-input-mask'

const Prod = ({ data }) => {
  const dispatch = useDispatch()
  const signUpRef = useRef()
  const [count, setCount] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const [showPopUp, setPopUpOpen] = useState(false)
  const [showPopUp1, setPopUpOpen1] = useState(false)
  const [combinedCart, setCombinedCart] = useState([])

  useEffect(() => {
    function handleClose (event) {
      if (signUpRef.current && !signUpRef.current.contains(event.target)) {
        handleCloseCheckAuth()
        handleCloseCheckAuth1()
      }
    }
    document.addEventListener('mousedown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [])

  const user = useSelector((state) => state.user)
  const isUserAuthorized = !!user._id

  useEffect(() => {
    function handleClose (event) {
      if (signUpRef.current && !signUpRef.current.contains(event.target)) {
        handleCloseCheckAuth()
        handleCloseCheckAuth1()
      }
    }
    document.addEventListener('mousedown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [])

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
    if (!isNaN(data.price)) {
      if (isUserAuthorized) {
        dispatch(addToCart({ product: data._id, count, userId: user._id })).then(res => showNotificationHandler())
      } else {
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const existingItemIndex = cartData.findIndex(item => item.product === data._id)

        if (existingItemIndex !== -1) {
          // If the product already exists, increase the count
          cartData[existingItemIndex].count += 1
        } else {
          // If the product doesn't exist, add it as a new item
          cartData.push({ product: data._id, count })
        }

        localStorage.setItem('cart', JSON.stringify(cartData))
        showNotificationHandler()
        console.log(localStorage)
      }
    } else {
      showManagerHandler()
    }
  }

  function handleCloseCheckAuth () {
    setPopUpOpen(false)
  }
  function handleCloseCheckAuth1 () {
    setPopUpOpen1(false)
  }
  const shortShow = () => {
    setPopUpOpen(true)
  }

  const shortShow1 = () => {
    if (!isNaN(data.price)) {
      setPopUpOpen1(true)
    } else {
      showManagerHandler()
    }
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
    if (data.count <= count) {
      showNotificationHandler()
      console.log(data)
    } else {
      const newCount = count + 1
      setCount(newCount)
    }
  }

  const [selected, setSelected] = useState('person')
  const handleClick = (value) => {
    setSelected(value)
  }

  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [buyerLastName, setBuyerLastName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [red1, setRed1] = useState(false)
  const [red2, setRed2] = useState(false)
  const [red3, setRed3] = useState(false)
  const [red4, setRed4] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [showField, setShowField] = useState(false)
  const [showCount, setShowCount] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const products11 = cartData.map(item => item.product)
    const counts = cartData.map(item => item.count)
    console.log(selected)
    if (selected == 'person') {
      if (buyerName == '' || buyerPhone == '' || buyerLastName == '' || buyerEmail == '') {
        if (buyerName == '') {
          setRed1(true)
        } else {
          setRed1(false)
        }
        if (buyerPhone == '') {
          setRed2(true)
        } else {
          setRed2(false)
        }
        if (buyerLastName == '') {
          setRed3(true)
        } else {
          setRed3(false)
        }
        if (buyerEmail == '') {
          setRed4(true)
        } else {
          setRed4(false)
        }
        showFieldHandler()

        return 0
      } else {
        setRed1(false)
      }
    } else {
      if (buyerPhone == '' || buyerEmail == '') {
        if (buyerPhone == '') {
          setRed2(true)
        } else {
          setRed2(false)
        }
        if (buyerEmail == '') {
          setRed4(true)
        } else {
          setRed4(false)
        }
        showFieldHandler()
        return 0
      }
    }

    axios.post('http://innovel.online/api/newOrder', JSON.stringify({
      buyerType: selected,
      buyerName,
      buyerPhone,
      buyerLastName,
      buyerEmail,
      deliveryRegion: event.target.region.value,
      deliveryCity: event.target.city.value,
      deliveryCost: 1000,
      products: products11,
      count: counts
    }), {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        showOrderHandler()
        setRed1(false)
        setRed2(false)
        setRed3(false)
        setRed4(false)
      })
      .catch((err) => {
        console.log('Error: ', err)
        setSuccess(true)
      })
  }
  const showOrderHandler = () => {
    setShowOrder(true)
    setTimeout(() => {
      setShowOrder(false)
    }, 7000)
  }
  const showFieldHandler = () => {
    setShowField(true)
    setTimeout(() => {
      setShowField(false)
    }, 7000)
  }
  const showCountHandler = () => {
    setShowCount(true)
    setTimeout(() => {
      setShowCount(false)
    }, 7000)
  }

  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [cities, setCities] = useState([])
  const [jsonData, setJsonData] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    fetch('/img/russia')
      .then(response => response.json())
      .then(data => {
        setJsonData(data)

        // Получение уникальных регионов
        const uniqueRegions = [...new Set(data.map(item => item.region))]
        setRegions(uniqueRegions)
      })
      .catch(error => {
        console.error('Ошибка загрузки данных:', error)
      })
  }, [])

  const handleRegionChange = e => {
    const selectedRegion = e.target.value
    setSelectedRegion(selectedRegion)

    const filteredCities = jsonData.filter(item => item.region === selectedRegion)
    setCities(filteredCities)
  }
  const handleCityChange = e => {
    const selectedCity = e.target.value
    setSelectedCity(selectedCity)
  }

  return (
        <div>
        <div className="tovar">
            <Link to={`/product/${data._id}/${data.name}`} element={<ProductCard data={data}/>}className="img">
                <img src={'data:image/png;base64,' + data.photo} alt={data.name} className="tovar-image" />
            </Link>
            <div className="image-icons">
                <div className="hover-items">
                    <div className="hover-icons">
                        <button className="icon nom1">
                        <FaEye className="icon-item " onClick={shortShow}></FaEye>
                        </button>
                        <div className="icon nom2">
                        <FaHeart className="icon-item " onClick={() => dispatch(addToFavrorite({ product: data._id, userId: user._id }))}></FaHeart>
                        </div>
                    </div>
                    <button className="buy-cart" onClick={adToCart}>В КОРЗИНУ</button>
                </div>
            </div>
            <Link to={`/product/${data._id}/${data.name}`}>
                <p className="tovar-desc">{data.name}</p>
            </Link>
            <h1 className="tovar-price">{isNaN(data.price) ? data.price : data.price + '₽'}</h1>
            {count
              ? (
            <div className="tov-nalich">
            <FaCheck className="tov-nalich-icon-yes"></FaCheck>
            <p className="tov-nalich-item-yes">В наличии</p>
            </div>
                )
              : (
            <div className="tov-nalich">
                <FaTimes className="tov-nalich-icon-no"></FaTimes>
                <p className="tov-nalich-item-no">Нет в наличии</p>
            </div>
                )}
            <button className="buy-button" onClick={shortShow1}>Купить в 1 клик</button>
            </div>
            {showNotification && (
            <div className="notification slideIn">Ваш товар был добавлен в корзину!</div>
            )}
            {showManager && (
            <div className="notification slideIn">Для покупки данного товара свяжитесь с менеджером!</div>
            )}
            {showPopUp && (
                <div className="reg-index" >
                <div className="overlay">
                    <div className="w backPop" ref={signUpRef}>
                <div className="pop-container">
                <FaTimes className="close-button" onClick={handleCloseCheckAuth}/>
                  <div className="product-card">
                    <img src={'data:image/png;base64,' + data.photo} alt={data.name} className="product-image t" />
                    <div className="product-card-info">
                      <h1 className="product-card-title">{data.name}</h1>
                      <p className="product-card-description">{data.description}</p>
                      <div className="product-line"></div>
                      <p className="product-card-price">{data.price}</p>
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
                {showNotification && (
          <div className="notification slideIn">Ваш товар был добавлен в корзину!</div>
                )}
        {showManager && (
                    <div className="notification slideIn">Для покупки данного товара свяжитесь с менеджером!</div>
        )}
              </div>
              </div>
              </div>
            )}
            {showPopUp1 && (
                 <div className="reg-index" >
                 <div className="overlay">
                     <div className="w backPop" ref={signUpRef}>
                 <div className="pop-container">
                 <FaTimes className="close-button" onClick={handleCloseCheckAuth1}/>
                   <div className="cart-info">
                     <div className="tovar-list1">
                       <h1 className="cart-title">Корзина</h1>
                        <div className="tovar-item1">
                              <img className="tovar-img" src={'data:image/png;base64,' + data.photo}/>
                              <div>
                                <h1 className="cart-item-title">{data.name}</h1>
                              </div>
                              <p className="cart-price">{data.price}₽</p>
                              {showNotification && (
                                <div className="notification slideIn">В наличии только {data.count}шт</div>
                              )}
                      </div>
                     </div>
                     <div className="">
                       <form onSubmit={(event) => handleSubmit(event)}>
                       <h1 className="cart-title">Оформление</h1>
                       <div className="cart-process">
                         <h2 className="process-title">Покупатель</h2>
                         <label className="label">Тип покупателя</label>
                         <div className="process-person bebebe">
                           <span onClick={() => handleClick('person')}
                           className={selected === 'person' ? 'select' : ''}>Персона</span>
                           <span onClick={() => handleClick('company')}
                           className={selected === 'company' ? 'select' : ''}>Компания</span>
                         </div>
                         <div className="dostavka">
                           <div className="left-row ">
                           {selected == 'person' &&
                               <div>
                                 <label className="label">Имя</label>
                               <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className={`input-select ${red1 ? ' red' : ''}`}/>
                               </div>
                             }
                               <label className="label">Телефон</label>
                               <InputMask value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} className={`input-select reg ${red2 ? ' red' : ''}`} placeholder='+7(___)-___-__-__' mask="+7(999)-999-99-99"/>
                           </div>
                           <div className="right-row">
                             {selected == 'person' &&
                               <div>
                                 <label className="label">Фамилия</label>
                                 <input value={buyerLastName} onChange={(e) => setBuyerLastName(e.target.value)}className={`input-select ${red3 ? ' red' : ''}`}/>
                               </div>
                             }
                               <label className="label">Электронная почта</label>
                               <input value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className={`input-select reg ${red4 ? ' red' : ''}`} placeholder='email'/>
                           </div>

                         </div>
                         <h2 className="process-title">Доставка</h2>

                         <div className="do-inf">
                           <span className="star">*</span>
                           <p className="do-inf-text">Для расчета стоимости и срока доставки заполните поля со звездочкой</p>
                         </div>
                         <div className="dostavka">
                           <div className="reg">
                             <label className="label">Регион<span className="star1">*</span></label>
                               <select className="input-select text-width" name="region" value={selectedRegion} onChange={handleRegionChange}>
                               <option value="">Выберите регион</option>
                               {regions.map((region, index) => (
                                 <option key={index} value={region}>{region}</option>
                               ))}
                               </select>
                           </div>
                           <div className="city">
                             <label className="label ">Город<span className="star1">*</span></label>
                               <select className="input-select text-width" name="city" value={selectedCity} onChange={handleCityChange}>
                               <option value="">Выберите город</option>
                               {cities.map((city, index) => (
                                 <option key={index} value={city.city}>{city.city}</option>
                               ))}
                               </select>
                             </div>
                         </div>
                         <div className="last-butt">
                           <div>
                           <div className="dostavka">
                             <div className="reg">
                               <label className="label-price">Стоимость доставки: </label>
                               <label className="label-price ">Стоимость товаров:</label>
                             </div>
                             <div>
                               <label className="label-price">1000₽ </label>
                               <label className="label-price ">{data.price}₽</label>
                             </div>
                           </div>
                             <div className="dostavka">
                             <label className="label-price-res">Итого: </label>
                             <label className="label-price-res">{Number(data.price) + 1000}₽</label>
                             </div>
                           </div>
                           <button className="confirm-button" type='submit'>Подтвердить заказ</button>
                         </div>
                       </div>
                       </form>
                     </div>
                   </div>
                   </div>
                   {showOrder && (
                     <div className="notification slideIn">Отлично! Письмо с заказом отправлено на почту. </div>
                   )}
                     {showField && (
                     <div className="notification slideIn">Заполнены не все поля.</div>
                     )}
               </div>
               </div></div>
            )}
            </div>
  )
}

export { Prod }
