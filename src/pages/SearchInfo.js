import React, { useEffect, useState } from 'react'
import { Headder } from '../components/header'
import '../styles/home.css'
import { Footer } from '../components/footer'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { ProductCard } from '../components/productCard'
import { Search } from '../components/search'
import { Prod } from '../components/product'

function SearchInf () {
  const params = useParams()
  const [value, setValue] = useState(params.promt)
  const [suggestions, setSuggestions] = useState([])
  const product = useSelector((state) => state.product.products)

  useEffect(() => {
    const getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase()
      const inputLength = inputValue.length

      if (!product || !product.data) {
        return []
      }
      return inputLength === 0
        ? []
        : product.data.filter((product) =>
          product.name.toLowerCase().includes(inputValue)
        )
    }

    const suggestions = getSuggestions(value)
    setSuggestions(suggestions)
  }, [value, product.data])

  const renderSuggestion = (suggestion) => {
    return (
      <Link
        to={`/product/${suggestion._id}/${suggestion.name}`}
        element={<ProductCard data={suggestion} />}
      >
        {suggestion.name}
      </Link>
    )
  }

  const handleSearch = (searchText) => {
    setValue(searchText)
  }
  return (
    <div>
      <Headder />
      <div className="container">
      <Search handleSearch={handleSearch} />
        <div className="table-product">
          {suggestions && console.log(suggestions)}
          {suggestions && suggestions.map((item) => (
              <div className="product-list" key={item._id}>
                <Prod data={item} />
              </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchInf
