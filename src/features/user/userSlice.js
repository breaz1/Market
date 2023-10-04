import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { addToCart } from '../cart/cartSlice'
const initialState = {
  name: null,
  login: null,
  email: null,
  organization: null,
  token: null,
  _id: null
}

export const getIsAuth = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { withCredentials: true })
    dispatch(setUser(res.data))
  }
)
export const getAuth = createAsyncThunk(
  'auth/getAuth',
  async ({ login, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post('', { login, password }, { withCredentials: true })
      dispatch(setUser(JSON.parse(JSON.stringify(res))))
      console.log(res)
      if (!res.data.error) {
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []
        cartItemsFromLocalStorage.forEach((item) => {
          dispatch(addToCart({ product: item.product, count: item.count, userId: res.data._id }))
        })
        localStorage.removeItem('cart')
      }
      window.location.reload()
      return res
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { withCredentials: true })
    dispatch(removeUser(res))
    window.location.reload()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state.name = action.payload.name
      state.login = action.payload.login
      state.email = action.payload.email
      state.organization = action.payload.organization
      state.token = action.payload.token
      state._id = action.payload._id
    },
    removeUser (state) {
      state.name = null
      state.login = null
      state.email = null
      state.organization = null
      state.token = null
      state._id = null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
