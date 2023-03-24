import React, { useState } from "react"
import "./App.css"
import SearchBlock from "./components/SearchBlock/SearchBlock"
import BooksBoard from "./components/BooksBoard/BooksBoard"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BookAbout from "./components/BookAbout/BookAbout"


function App() {
  const [init, setInit] = useState(false)

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <SearchBlock />
          <Routes>
            <Route path="/" element={<BooksBoard init={init} setInit={setInit}/>}/>
            <Route path="/:id" element={<BookAbout />}/>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
