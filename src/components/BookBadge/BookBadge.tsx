import React from "react"
import styles from "./BookBadge.module.css"

import book from "../../assets/book.png"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../redux/store"
import { setBookData } from "../../redux/bookSlice"

import type { RequestInfo } from "../../Types/Types"

type BookBadgeProps = {
  info: RequestInfo
  id: string
}



const renderAuthors = (authors: Array<string>) => {
  if (!authors) return <span>Author unknown</span>
  if (authors.length == 1) return <span>{authors[0]}</span>
  if (authors.length == 2) {
    return (
      <span>
        {authors[0]}, {authors[1]}
      </span>
    )
  }
  if (authors.length > 2) {
    return (
      <span>
        {authors[0]}, {authors[1]} and {authors.length - 2}{" "}
        {authors.length - 2 == 1 ? "other" : "others"}
      </span>
    )
  }
}

const BookBadge = (props: BookBadgeProps) => {
  const dispatch = useAppDispatch()
  const handleLinkClick = () => {
    dispatch(setBookData({ info }))
  }
  const { info, id } = props
  return (
    <div className={styles.wrapper}>
      <Link to={`/${id.replaceAll("/", "")}`} onClick={handleLinkClick}>
        <div className={styles.image}>
          {info.imageLinks ? (
            <img src={info.imageLinks.thumbnail} />
          ) : (
            <img src={book} />
          )}
        </div>
        <div className={styles.category}>
          {info.categories ? info.categories[0] : "Category not specified"}
        </div>
        <div className={styles.title}>
          {info.title.length > 60
            ? info.title.slice(0, 60) + "..."
            : info.title}
        </div>
        <div className={styles.authors}>{renderAuthors(info.authors)}</div>
      </Link>
    </div>
  )
}

export default BookBadge
