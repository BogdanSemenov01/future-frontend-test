import React, { useState } from "react"
import styles from "./SearchBlock.module.css"
import { useAppDispatch } from "../../redux/store"
import { SearchBooks } from "../../redux/booksSlice"

const SearchBlock = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")
  const handleChangeInput = (e: any) => {
    setValue(e.target.value)
  }

  const makeSearchRequest = () => {
    dispatch(SearchBooks({ type: "text", text: value }))
  }

  const handelSelectCategory = (e: any) => {
    dispatch(SearchBooks({ type: "category", text: e.target.value }))
  }

  const handelSelectOrder = (e: any) => {
    dispatch(SearchBooks({ type: "order", text: e.target.value }))
  }

  return (
    <div>
      <div className={styles.title}>Search for books</div>
      <div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Search a book"
            value={value}
            onChange={handleChangeInput}
          />
          <button onClick={makeSearchRequest}>Search</button>
        </div>
        <div className={styles.selectors}>
          <div>
            <label htmlFor="select">Categories: </label>
            <select
              name="Categories"
              defaultValue={"all"}
              onChange={handelSelectCategory}
            >
              <option value="all">All</option>
              <option value="art">Art</option>
              <option value="biography">Biography</option>
              <option value="computers">Computers</option>
              <option value="history">History</option>
              <option value="medical">Medical</option>
              <option value="poetry">Poetry</option>
            </select>
          </div>
          <div>
            <label htmlFor="select">Sorting by: </label>
            <select
              name="Sort"
              defaultValue={"relevance"}
              onChange={handelSelectOrder}
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SearchBlock
