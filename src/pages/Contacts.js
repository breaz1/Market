import React from 'react'
import { Link } from 'react-router-dom'
import { Headder } from '../components/header'
import { FaEnvelope, FaMobile, FaHome } from 'react-icons/fa'

import SimpleMap from '../components/Map'
import '../Contacts.css'
import { Footer } from '../components/footer'

function Contacts () {
  return (
      <div>
        <Headder />
        <div className="map">
          <div style={{ width: '70%', height: '70vh' }}>
              <SimpleMap />
            </div>
            <div className="contacts-block">
            <div className="line line-map"></div>
          <div className="contacts">
                <div className="contact">
                  <FaEnvelope />
                  <p>email: abc@gmail.com</p>
                </div>
                <div className="contact">
                  <FaMobile />
                  <p>телефон: +7987654321</p>
                </div>
                <div className="contact">
                  <FaHome />
                  <p>адрес: Ул. Пушкина, Дом колотушкина 12</p>
                </div>
              </div>
              <div className="line line-map"></div>
          </div>
        </div>
      </div>
  )
}

export default Contacts
