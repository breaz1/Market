import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import { useSelector } from 'react-redux'
import { ProductCard } from './productCard'
import theme from '../styles/theme.css'

const Search = ({ handleSearch }) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const product = useSelector((state) => state.product.products)

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : product.data.filter((product) =>
        product.name.toLowerCase().includes(inputValue)
      )
  }
  const handleSearchClick = () => {
    if (typeof (handleSearch) === 'function') {
      handleSearch(value)
    }
  }
  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value)
    setSuggestions(suggestions)
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const renderSuggestion = (suggestion) => {
    return <Link to={`/product/${suggestion._id}/${suggestion.name}`} element={<ProductCard data={suggestion}/>}>{suggestion.name}</Link>
  }

  const inputProps = {
    value,
    onChange,
    placeholder: 'Введите название продукта'
  }

  return (
    <div className="search">
      <div className="search-block">
        <Link><Autosuggest
        theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        /></Link>
        <Link to={`/search/${value}`}><button className="search-button" onClick={handleSearchClick}><FaSearch/></button></Link>
      </div>
    </div>
  )
}

export { Search }
