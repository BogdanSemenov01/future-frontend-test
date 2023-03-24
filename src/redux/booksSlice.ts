import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BooksApi } from '../api/books/books'

const initialState = {
  books:  [],
  totalItems: 0
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialBooks.fulfilled, (state: any, action) => {
        state.books.push(...action.payload.items)
        state.totalItems = action.payload.totalItems
    })
    builder.addCase(LoadMoreBooks.fulfilled, (state: any, action) => {
        state.books.push(...action.payload.items)
    })
    builder.addCase(SearchBooks.fulfilled, (state: any, action) => {
        state.books = action.payload.items
    })
  },
})

export const {  } = booksSlice.actions

export default booksSlice.reducer

export const setInitialBooks = createAsyncThunk(
  'books/getBooks',
  async ( thunkAPI ) => {
    const response = await BooksApi.initBooks()
    return response
  }
)
export const LoadMoreBooks = createAsyncThunk(
  'books/loadMoreBooks',
  async ( startIndex: number, thunkAPI ) => {
    const response = await BooksApi.loadMore(startIndex)
    return response
  }
)

export const SearchBooks = createAsyncThunk(
  'books/searchBooks',
  async ( data: {type: string, text: string}, thunkAPI ) => {
    switch (data.type) {
      case 'text': {
        const response = await BooksApi.searchBooksByText(data.text)
        return response
      }
      case 'category': {
        const response = await BooksApi.searchBooksByCategory(data.text)
        return response
      }
      case 'order': {
        const response = await BooksApi.reorderBooks(data.text)
        return response
      }
      default:
        break;
    }
  }
)