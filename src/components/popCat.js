import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const PopCat = ({ data, rootCategories }) => {
  const dispatch = useDispatch()
  const fatherCat = rootCategories.find(item => item.name == data.name)
  return (
        <div className="popular-kategory">
            {console.log(rootCategories)}
            {console.log(fatherCat)}
            {fatherCat &&
                <Link to={`/catalog/${fatherCat._id}/${fatherCat.name}`}>
            <img className ='part-logo' src={'data:image/png;base64,' + data.content} alt={data.name} />
            <p className="popular-category-text">{data.name}</p>
            </Link>
            }

        </div>
  )
}

export { PopCat }
