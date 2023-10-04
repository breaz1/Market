import React, { useState } from 'react'
import '../styles/category.css'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

const Category = ({ data, categories }) => {
  const [showSubcategories, setShowSubcategories] = useState(false)

  const onMouseEnter = (e) => {
    setShowSubcategories(true)
  }

  const onMouseLeave = () => {
    setShowSubcategories(false)
  }

  const subcategories = categories.data
    .filter((category) => category.parent == data._id)
    .map((subcategory) => (
      <div key={subcategory._id}>
        <Link to={`/catalog/${subcategory._id}/${subcategory.name}`}>
          <Category data={subcategory} categories={categories} />
        </Link>
      </div>
    ))

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: 'relative' }}
      className="main-category"
    >
       <div className="category">
      <Link to={`/catalog/${data._id}/${data.name}`} ><p className="category-title">{data.name}</p></Link>
        <FaChevronRight />
        </div>
      <div className="category-line"></div>
      {showSubcategories && (
        <div
          className="catalog"
          style={{ position: 'absolute', top: 0, right: '-14vw', margin: 0 }}
        >
          <ul>{subcategories}</ul>
        </div>
      )}
    </div>
  )
}

export { Category }
