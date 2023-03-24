import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BooksApi } from '../api/books/books'

const initialState = {
  data: {

  }
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookData(state: any, action) {
      state.data = action.payload.info
    }
  },
  
})

export const { setBookData } = bookSlice.actions

export default bookSlice.reducer

