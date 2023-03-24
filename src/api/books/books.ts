import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  
})

const apiKey = process.env.REACT_APP_API_KEY
const MAX_RESULT = 24

export const BooksApi = {
  searchText: '',
  setSearchText(newText: string) {
    this.searchText = newText
  },
  searchCategory: '',
  setSearchCategory(newCategory: string) {
    this.searchCategory = newCategory
  },
  searchOrder: 'relevance',
  setSearchOrder(newOrder: string) {
    this.searchOrder = newOrder
  },
  async initBooks() {
    const response = await instance.get(`?q=${this.searchText}+intitle&maxResults=${MAX_RESULT}&key=${apiKey} `)
    return response.data
  },
  async loadMore(startIndex: number) {
    const response = await instance.get(`?q=${this.searchText || this.searchCategory}+intitle&maxResults=${MAX_RESULT}&startIndex=${startIndex + MAX_RESULT}&key=${apiKey} `)
    return response.data
  },
  async searchBooksByText(text: string) {
    this.setSearchText(text)
    this.searchCategory = ''
    const response = await instance.get(`?q=${this.searchText}+intitle&maxResults=${MAX_RESULT}&orderBy=${this.searchOrder}&startIndex=0&key=${apiKey} `)
    return response.data
  },
  async searchBooksByCategory(category: string) {
    this.searchCategory = category
    this.searchText = ''
    const response = await instance.get(`?q=${this.searchCategory}+subject&maxResults=${MAX_RESULT}&orderBy=${this.searchOrder}&startIndex=0&key=${apiKey}`)
    return response.data
  },
  async reorderBooks(order: string) {
    this.setSearchOrder(order)
    return this.searchText === '' ? this.searchBooksByCategory(this.searchCategory) : this.searchBooksByText(this.searchText)
  }
}

