import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import productSlice from '../features/product/productSlice'
import categorySlice from '../features/category/categorySlice'
import cartSlice from '../features/cart/cartSlice'
import favoriteSlice from '../features/favorite/favoriteSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    category: categorySlice,
    cartItem: cartSlice,
    favorite: favoriteSlice
  }
})
