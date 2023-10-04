import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/admin.css'
import { AdminSlider } from './slider'
import { AdminPartners } from './partners'
import { AdminContacts } from './contacts'
import { AdminPopCat } from './popCat'

const AdminSwitchInfo = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const favorite = useSelector((state) => state.favorite.favorites)

  const [activeTab, setActiveTab] = useState('slider')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
        <div>
        <div className="container-profile">
          <div className="info-profile">
            <div className="menue">
              <div onClick={() => handleTabClick('slider')}className={`menue-text ${activeTab === 'slider' ? 'active' : ''}`}>
                  <button className='user-list-item'
                >
                  <h1 className="el black">Новости</h1>
                </button>
              </div>
              <div onClick={() => handleTabClick('partners')}className={`menue-text ${activeTab === 'partners' ? 'active' : ''}`}>
              <button
                  className='user-list-item'
                >
                  <h1 className="el black">Партнеры</h1>
                </button>
              </div>
              <div onClick={() => handleTabClick('contacts')}className={`menue-text ${activeTab === 'contacts' ? 'active' : ''}`}>
              <button
                  className='user-list-item'
                >
                  <h1 className="el black">Контакты</h1>
                </button>
              </div>
              <div onClick={() => handleTabClick('popcat')}className={`menue-text ${activeTab === 'popcat' ? 'active' : ''}`}>
              <button
                  className='user-list-item'
                >
                  <h1 className="el black">Популярные категории</h1>
                </button>
              </div>
            </div>
            <div className="user-info">
            {activeTab === 'slider' && <AdminSlider />}
            {activeTab === 'partners' && <AdminPartners />}
            {activeTab === 'contacts' && <AdminContacts />}
            {activeTab === 'popcat' && <AdminPopCat />}
            </div>
          </div>
      </div>
      </div>
  )
}

export { AdminSwitchInfo }
