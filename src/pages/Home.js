import React, { useState, useEffect } from 'react'
import { Headder } from '../components/header'
import '../styles/home.css'
import { Footer } from '../components/footer'
import 'react-awesome-slider/dist/styles.css'
import { Slider } from '../components/slider'
import { Category } from '../components/category'
import { Search } from '../components/search'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { PopCat } from '../components/popCat'

function Home () {
  const [partnersData, setPartnersData] = useState([])
  useEffect(() => {
    fetchPartnersData()
  }, [])

  const fetchPartnersData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setPartnersData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const categories = useSelector((state) => state.category.categories)

  const rootCategories = categories.data && categories.data.filter(
    (category) => category.parent == 'root')

  const [PopCategoriesData, setPopCategoriesData] = useState([])
  useEffect(() => {
    fetchPopCategoriesData()
  }, []) // Fetch the data when the component mounts

  const fetchPopCategoriesData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setPopCategoriesData(response.data) // Save the partners data in state
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div >
        <Headder />
        <div className="container">
            <Search />
          <div className="info">
            <div className="catalog">
            {categories.data &&
            Object.keys(rootCategories)
              .map(k =>
            <Category key={rootCategories[k]._id} data={rootCategories[k]} categories={categories}/>)}
            </div>
            <div className="main-info">
              <div className="main-info-news">
                  <Slider/>
                </div>
                <div className="main-info-categories">
                <h1 className="info-title">Популярные категории</h1>
                    <div className="line-info">
                    {PopCategoriesData &&
                      Object.keys(PopCategoriesData)
                        .map(k =>
                      <PopCat data={PopCategoriesData[k]} rootCategories={rootCategories} key={PopCategoriesData[k]._id} />)}
                    </div>
                </div>
                <div className="main-info-partners">
                    <h1 className="info-title">Наши партнеры</h1>
                    <div className="line-info">
                    {partnersData.map((partner) =>
                        <img className ='part-logo' src={'data:image/png;base64,' + partner.content} alt={partner.name}/>
                    )}
                    </div>
                </div>
            </div>
          </div>
          </div>
          <Footer />
      </div>
  )
}

export default Home
