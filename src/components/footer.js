import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/footer.css'
import '../styles/headder.css'

// <div style={{width: '70%', height: '50vh'}}>
//   <SimpleMap />
// </div>
function Footer () {
  const [contactsData, setContactsData] = useState([])
  useEffect(() => {
    fetchContactsData()
  }, []) // Fetch the data when the component mounts

  const fetchContactsData = async () => {
    try {
      const response = await axios.get('', { withCredentials: true })
      setContactsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  ///                  <p>{contactsData ? contactsData[1].content:''}</p>
  return (
      <div className="footer">
        <div className="line"></div>
        <div className="footer cont">
          <div className="contacts left">
                <div className="contact">
                  <img className ='comp-logo' src='/img/logo.png'/>
                </div>
                <div className="contact about">
                  <Link to='/About' className="el contacts" >О компании</Link>
                </div>
              </div>
          <div className="contacts right">

                <div className="cont-left">
                <div className="contact">
                  <FaPhone className="logo"/>
                  <p>{contactsData[1] ? contactsData[1].content : ''}</p>
                </div>
                </div>

                <div>

                <div className="contact">
                  <FaEnvelope className="logo"/>
                  <p>{contactsData[0] ? contactsData[0].content : ''}</p>
                  </div>
                </div>

              </div>
              </div>
          </div>
  )
}

export { Footer }
