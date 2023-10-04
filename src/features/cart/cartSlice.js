import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  cartItems: []
}

export const deleteItemFromCart = createAsyncThunk(
  'cartItems/deleteItemFromCart',
  async ({ cartId: id, count }, { rejectWithValue, dispatch }) => {
    try {
      console.log(id + ' ' + count + 'MINUS')
      const res = await axios.post('', { cartId: id, count }, { withCredentials: true })
      console.log(res + 'MINUS')
      dispatch(deleteCart(JSON.parse(JSON.stringify(res))))
    } catch (error) {
      console.log(error)
    }
  }
)

export const getCart = createAsyncThunk(
  'cartItems/getCartItems',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { withCredentials: true })
    dispatch(setCart(JSON.parse(JSON.stringify(res))))
  }
)

/// addToCart
export const addToCart = createAsyncThunk(
  'cartItems/addToCartItems',
  async ({ product, count, userId }, { rejectWithValue, dispatch }) => {
    console.log(product + '  ' + count + '  ' + userId + 'plus')
    const res = await axios.post('',
      { product, count, userId }, { withCredentials: true })
    console.log(res + 'plus')
    dispatch(setCart(JSON.parse(JSON.stringify(res))))
  }
)

export const cartSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload
    },
    deleteCart: (state, action) => {
      const cart = action.payload
      if (typeof (state.carts.data) === Array) { state.carts.data = state.carts.data.filter((item) => item._id == cart.data._id ? item.count = cart.data.count : item) } else { state.carts.data.count = cart.data.count }
    }
  }
})

export const { setCart, deleteCart } = cartSlice.actions
export default cartSlice.reducer
