import React, { useState } from 'react'
import { Headder } from '../components/header'
import { Footer } from '../components/footer'
import '../styles/home.css'

import { ProfileInfo } from '../components/infoProfile'
import { Favorite } from '../components/favorite'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice'

function Profile () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const favorite = useSelector((state) => state.favorite.favorites)

  const [activeTab, setActiveTab] = useState('profile')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  const userLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
      <div>
        <Headder />
        <div className="container-profile">
          <div className="info-profile">
            <div className="menue">
              <div onClick={() => handleTabClick('profile')}className={`menue-text ${activeTab === 'profile' ? 'active' : ''}`}>
                  <button className='user-list-item'
                >
                  <h1 className="el black">{user.name}</h1>
                </button>
              </div>
              <div onClick={() => handleTabClick('favorite')}className={`menue-text ${activeTab === 'favorite' ? 'active' : ''}`}>
              <button
                  className='user-list-item'
                >
                  <h1 className="el black">Избранное</h1>
                </button>
              </div>
              <div onClick={userLogout} className={`menue-text ${activeTab === 'logout' ? 'active' : ''}`}>
                <button className="user-list-item">
                  <h1 className="el black">Выход из аккаунта</h1>
                </button>
              </div>
            </div>
            <div className="user-info">
            {activeTab === 'profile' && <ProfileInfo />}
            {activeTab === 'favorite' && favorite && favorite.data.map((favoriteItem) => (
                <Favorite key={favoriteItem._id} data={favoriteItem} />
            ))}
            </div>
          </div>
      </div>
      <Footer/>
      </div>
  )
}

export default Profile
