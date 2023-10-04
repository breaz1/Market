import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import '../styles/Carousel.css'
import axios from 'axios'

function Slider () {
  const [sliderData, setSliderData] = useState([])
  useEffect(() => {
    fetchSliderData()
  }, [])

  const fetchSliderData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setSliderData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
            <Carousel className='news' showThumbs={false} showArrows={false} showStatus={false} stopOnHover={false} infiniteLoop={true} autoPlay={true} interval={8000}>
                {sliderData.map((slide) =>
                    <div className='element'>
                        <img src={'data:image/png;base64,' + slide.content} />
                    </div>
                )}

            </Carousel>
  )
}

export { Slider }
