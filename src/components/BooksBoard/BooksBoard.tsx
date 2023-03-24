import React, { memo, useEffect, useRef, useState } from "react"
import BookBadge from "../BookBadge/BookBadge"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { LoadMoreBooks, setInitialBooks } from "../../redux/booksSlice"
import styles from "./BooksBoard.module.css"

const BooksBoard = memo(function BooksBoard(props: {init: boolean, setInit: (arg: boolean) => void}) {
  const books: Array<object> = useAppSelector((state) => state.books.books)
  const totalItems: number = useAppSelector((state) => state.books.totalItems)

  const dispatch = useAppDispatch()
  const ref = useRef<null | object[]>(null)
  const [state, setState] = useState(books)

  const [indexBooks, setIndexBooks] = useState(8)

  const handleClickLoadMoreButton = () => {
    dispatch(LoadMoreBooks(indexBooks))
    setIndexBooks(prevState => prevState + 8)
  }

  useEffect(() => {
    if (ref.current !== state && props.init == false) {
      dispatch(setInitialBooks())
    }
    props.setInit(true)
    ref.current = state
  }, [state])
  return (
    <div className={styles.wrapper}>
      <div className={styles.totalItems}>
        Found {totalItems} {totalItems == 1 ? "result" : "results"}
      </div>
      <div className={styles.books}>
        {books.map((b: any) => {
          return <BookBadge key={b.id + b.etag} id={b.id + b.etag} info={b.volumeInfo} />
        })}
      </div>
      <div
        className={styles.loadMoreButton}
        onClick={handleClickLoadMoreButton}
      >
        <div>Load more</div>
      </div>
    </div>
  )
})

export default BooksBoard
