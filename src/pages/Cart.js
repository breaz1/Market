import React, { useState, useEffect } from 'react'
import { Headder } from '../components/header'
import '../styles/home.css'
import '../styles/cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/product/productSlice'
import { getIsAuth } from '../features/user/userSlice'
import { getCart } from '../features/cart/cartSlice'
import useInput from '../hooks/useInput'
import { CartItem } from '../components/cartItem'
import axios from 'axios'
import InputMask from 'react-input-mask'

function Cart () {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('person')
  const handleClick = (value) => {
    setSelected(value)
  }
  const cartItems = useSelector((state) => state.cartItem.carts)
  const user = useSelector((state) => state.user)
  const isUserAuthorized = !!user._id
  const storedProducts = JSON.parse(localStorage.getItem('cart'))
  const product = useSelector((state) => state.product.products)

  useEffect(() => {
    dispatch(getIsAuth())
    dispatch(getCart())
    dispatch(getProducts())
  }, [dispatch])

  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalLocalPrice, setTotalLocalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(0)
    const CartTotal = async () => {
      const response = await axios.get(
        '',
        { withCredentials: true }
      )
      const ttlPrice = response.data.total
      console.log(ttlPrice)
      setTotalPrice(ttlPrice)
      storedProducts = JSON.parse(localStorage.getItem('cart'))
      const items = product.data && product.data.filter((product) =>
        storedProducts.some((localProd) => product._id === localProd.product)
      )

      if (items && storedProducts) {
        items.reduce((total, item) => {
          if (item.hasOwnProperty('count') && item.hasOwnProperty('price') && !isNaN(item.count)) {
            const count = Number(item.count) // Convert count to a number
            const price = Number(item.price) // Convert price to a number if needed
            console.log(storedProducts)
            // Check if count is a valid number and perform multiplication
            if (!isNaN(count) && !isNaN(price)) {
              return total + count * price
            }
          }
        }, 0)
      };
    }
    CartTotal()
  }, [])

  const reRender = async () => {
    const storedProducts = JSON.parse(localStorage.getItem('cart'))
    if (isUserAuthorized) {
      setTotalPrice(0)
      const response = await axios.get(
        '',
        { withCredentials: true }
      )
      const ttlPrice = response.data.total

      setTotalPrice(ttlPrice)
    } else {
      if (storedProducts) {
        const items = product.data && product.data.filter((product) =>
          storedProducts.some((localProd) => product._id === localProd.product)
        )
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []
        const totalPriceLOcal = items.reduce((total, item) => {
          if (item.hasOwnProperty('count') && item.hasOwnProperty('price') && !isNaN(item.count)) {
            const count = cartItemsFromLocalStorage.find(cartItem => cartItem.product == item._id)
            const price = Number(item.price)
            console.log(count)
            console.log(storedProducts)
            if (!isNaN(count.count) && !isNaN(price)) {
              return total + count.count * price
            }
          }
        }, 0)

        console.log(totalPriceLOcal)
        setTotalLocalPrice(totalPriceLOcal)
      }
    }
    setDoubleClick(false)
  }

  useEffect(() => {
    if (isUserAuthorized) {
      if (cartItems) {
        if (Array.isArray(cartItems.data)) {
          setCartData([...cartItems.data])
          console.log(cartData)
        } else if (cartItems.data) {
          setCartData(cartItem => cartItem._id == cartItems ? cartItem = cartItems : cartItem)
        }
        reRender()
      }
    } else {
      const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []
      setCartData(cartItemsFromLocalStorage)
      reRender()
    }
  }, [cartItems])

  const [buyerName, setBuyerName] = useInput('')
  const [buyerPhone, setBuyerPhone] = useInput('')
  const [buyerLastName, setBuyerLastName] = useInput('')
  const [buyerEmail, setBuyerEmail] = useInput('')
  const [red1, setRed1] = useState(false)
  const [red2, setRed2] = useState(false)
  const [red3, setRed3] = useState(false)
  const [red4, setRed4] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [showField, setShowField] = useState(false)
  const [showDoubleClick, setShowDoubleClick] = useState(false)
  const [doubleClick, setDoubleClick] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!doubleClick) {
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

      axios.post('', JSON.stringify({
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
        .then(() => {
          showOrderHandler()
          setRed1(false)
          setRed2(false)
          setRed3(false)
          setRed4(false)
          setDoubleClick(true)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    } else {
      showDoubleClickHandler()
      setDoubleClick(true)
    }
  }

  const showDoubleClickHandler = () => {
    setShowDoubleClick(true)
    setTimeout(() => {
      setShowDoubleClick(false)
    }, 7000)
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
        <Headder />
        <div className="container">
          <div className="cart-info">
            <div className="tovar-list">
              <h1 className="cart-title">Корзина</h1>
              {cartData && cartData.map((cartItem) => (
                <CartItem key={cartItem.product} data={cartItem} setTotalPrice={reRender}/>
              ))}
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
                      <label className="label-price">1000 </label>
                      <label className="label-price ">{isUserAuthorized ? totalPrice : totalLocalPrice}</label>
                    </div>
                  </div>
                    <div className="dostavka">
                    <label className="label-price-res">Итого: </label>
                    <label className="label-price-res">{isUserAuthorized ? totalPrice + 1000 : totalLocalPrice + 1000}</label>
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
            {showDoubleClick && (
            <div className="notification slideIn">Вы уже оформили заказ.</div>
            )}
      </div>
  )
}

export default Cart
