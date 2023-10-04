import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'

import { deleteFavoriteItem } from '../features/favorite/favoriteSlice'
import { Link } from 'react-router-dom'
import { ProductCard } from './productCard'

const Favorite = ({ data }) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product.products)
  const favorites = product.data && product.data.filter((product) => product._id == data.product)

  if (!favorites[0]) {
    return null
  }
  return (
        <div className="tovar-item">
            {console.log(favorites[0])}
                <Link to={`/product/${favorites[0]._id}/${favorites[0].name}`} element={<ProductCard data={favorites[0]}/>}className="img">
                  <img className="tovar-img" src={'data:image/png;base64,' + favorites[0].photo}/>
                </Link>
                <div>
                  <h1 className="cart-item-title">{favorites[0].name}</h1>
                  <button className="delete-item" onClick={() => dispatch(deleteFavoriteItem(data._id))}>
                    <FaTrash/>
                    <p className="delete">Удалить</p>
                  </button>
                </div>
        </div>
  )
}

export { Favorite }
