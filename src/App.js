import React from 'react'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Reg from './pages/register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { SignUp } from './components/SignUp'
import { ProductCard } from './components/productCard'
import Admin from './pages/Admin'
import SearchInf from './pages/SearchInfo'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="catalog" element={<Catalog/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Reg />} />
          <Route path="sign" element={<SignUp />} />
          <Route path="product/:productId/:productName" element={<ProductCard />} />
          <Route path="/catalog/:categoryId/:categoryName" element={<Catalog/>}/>
          <Route path="admin" element={<Admin/>}/>
          <Route path="/search/:promt/" element={<SearchInf/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
