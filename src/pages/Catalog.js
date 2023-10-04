import React, { useEffect, useState } from 'react'
import { Search } from '../components/search'
import { Headder } from '../components/header'
import '../styles/home.css'
import { Footer } from '../components/footer'
import { Prod } from '../components/product'
import { Category } from '../components/category'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/product/productSlice'
import { getIsAuth } from '../features/user/userSlice'
import { getCategories } from '../features/category/categorySlice'
import { useParams } from 'react-router-dom'

function Catalog () {
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  useEffect(() => {
    dispatch(getIsAuth())
  }, [dispatch])
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  const [sortType, setSortType] = useState('По названию')

  const categories = useSelector((state) => state.category.categories)
  const product = useSelector((state) => state.product.products)

  function getCategoryWithChildren (category, categories) {
    const result = [category]

    const children = categories.filter((c) => c.parent === category._id)
    children.forEach((c) => {
      result.push(...getCategoryWithChildren(c, categories))
    })

    return result
  }

  let itemsOfSelectedCategory = categories.data
  if (params.categoryId) {
    const selectedCategory = categories.data && categories.data.find((category) => category._id == params.categoryId)
    if (selectedCategory) {
      itemsOfSelectedCategory = getCategoryWithChildren(selectedCategory, categories.data)
    } else {
      itemsOfSelectedCategory = []
    }
  }

  const products = product.data && product.data.filter((product) => {
    if (itemsOfSelectedCategory.length === categories.data.length) {
      return true
    }

    return itemsOfSelectedCategory.some(
      (category) => category._id === product.category
    ) && product.category !== 'root'
  })

  const rootCategories = categories.data && categories.data.filter(
    (category) => category.parent == 'root')

  const handleSortByName = () => {
    if (sortType == 'По названию') {
      setSortType('По убыванию названия')
    } else { setSortType('По названию') }
  }

  const handleSortByPrice = () => {
    if (sortType == 'По цене') {
      setSortType('По убыванию цены')
    } else { setSortType('По цене') }
  }

  const sortedProducts = products && [...products].sort((a, b) => {
    if (sortType == 'По названию') {
      return a.name.localeCompare(b.name)
    } else if (sortType == 'По убыванию названия') {
      return b.name.localeCompare(a.name)
    } else if (sortType == 'По цене') {
      return a.price - b.price
    } else if (sortType == 'По убыванию цены') {
      return b.price - a.price
    }
    return 0
  })

  return (
      <div>
        <Headder />
        <div className="container">
          <Search />
          <div className="sort-buttons">
            <button onClick={handleSortByName} className="confirm-button sort-button l">По названию</button>
            <button onClick={handleSortByPrice} className="confirm-button sort-button r">По цене</button>
          </div>
          <div className="info">
            <div>
              <div className="catalog catalog-catalog">
              {categories.data &&
              Object.keys(rootCategories)
                .map(k =>
              <Category key={rootCategories[k]._id} data={rootCategories[k]} categories={categories}/>)}
                </div>
            </div>
            <div className="table-product">
            {sortedProducts && Object.keys(sortedProducts).map(k => (
                <div className="product-list" key={sortedProducts[k]._id}>
                  <Prod data={sortedProducts[k]} />
                </div>
            ))}
          </div>
          </div>
          </div>
          <Footer />
      </div>
  )
}

export default Catalog
