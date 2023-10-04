import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  categories: []
}

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { headers: 'Acess-Control-Allow-Origin' })
    dispatch(setCategories(JSON.parse(JSON.stringify(res))))
  }
)

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async ({ name, parent }, { rejectWithValue, dispatch }) => {
    const res = await axios.post('',
      { name, parent }).then(res => console.log(res))
    dispatch(setCategories(JSON.parse(JSON.stringify(res.data))))
  }
)
export const deleteCategories = createAsyncThunk(
  'category/deleteCategories',
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id)
    const res = await axios.post('', { category: id }, { headers: 'Acess-Control-Allow-Origin' })
      .then(res => console.log(res))
      .catch(res => console.log(res))
    dispatch(deleteCategory(id))
  }
)

export const catrgorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    deleteCategory: (state, action) => {
      const itemId = action.payload
      state.categories.data = state.categories.data.filter((item) => item._id !== itemId)
    }
  }
})

export const { setCategories, deleteCategory } = catrgorySlice.actions
export default catrgorySlice.reducer
