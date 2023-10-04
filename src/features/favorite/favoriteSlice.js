import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  favorites: []
}

export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { withCredentials: true })
    dispatch(setFavorite(JSON.parse(JSON.stringify(res))))
  }
)
/// addToCart
export const addToFavrorite = createAsyncThunk(
  'favorite/addToFavorite',
  async ({ product, userId }, { rejectWithValue, dispatch }) => {
    const res = await axios.post('',
      { userId, product }, { withCredentials: true })
      .then(res => console.log(res))
    dispatch(setFavorite(JSON.parse(JSON.stringify(res))))
  }
)

export const deleteFavoriteItem = createAsyncThunk(
  'favorite/deleteFavorite',
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id)
    const res = await axios.post('', { favoriteId: id }, { withCredentials: true }).then(res => console.log(res))
      .catch(res => console.log(res))
    dispatch(deleteFavorite(id))
  }
)

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favorites = action.payload
    },
    deleteFavorite: (state, action) => {
      const itemId = action.payload
      state.favorites.data = state.favorites.data.filter((item) => item._id !== itemId)
    }
  }
})

export const { setFavorite, deleteFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
