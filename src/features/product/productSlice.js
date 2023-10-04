import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: []
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { headers: 'Acess-Control-Allow-Origin' })
    dispatch(setProduct(JSON.parse(JSON.stringify(res))))
  }
)
export const addProduct = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('', { headers: 'Acess-Control-Allow-Origin' })
    dispatch(setProduct(JSON.parse(JSON.stringify(res))))
  }
)

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id)
    const res = await axios.post('', { product: id }, { headers: 'Acess-Control-Allow-Origin' })
      .then(res => console.log(res))
      .catch(res => console.log(res))
    dispatch(deleteProduct(id))
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload
    },
    deleteProduct: (state, action) => {
      const itemId = action.payload
      state.products.data = state.products.data.filter((item) => item._id !== itemId)
    }
  }
})

export const { setProduct, deleteProduct } = productSlice.actions
export default productSlice.reducer
