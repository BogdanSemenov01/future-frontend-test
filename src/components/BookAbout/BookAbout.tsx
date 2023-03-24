import React from "react"
import { useAppSelector } from "../../redux/store"

import styles from "./BookAbout.module.css"
import book from "../../assets/book.png"

const BookAbout = () => {
  const data: any = useAppSelector((state) => state.book.data)

  const renderData = (data: Array<string>, type: "authors" | "categories") => {
    if (!data)
      return (
        <span>
          {type == "authors" ? "Author unknown" : "Categories not specified"}
        </span>
      )
    if (data.length === 1) return <span>{data[0]}</span>
    return data.map((c: string, index: number) => {
      if (index === data.length - 1) return <span>{c}</span>
      return <span key={index}>{c}, </span>
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {data.imageLinks ? (
          <img src={data.imageLinks.thumbnail} />
        ) : (
          <img src={book} />
        )}
      </div>
      <div className={styles.about}>
        <div className={styles.category}>
          {renderData(data.categories, "categories")}
        </div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.authors}>
          {renderData(data.authors, "authors")}
        </div>
        <div className={styles.description}>
          {data.description || "Description empty"}
        </div>
      </div>
    </div>
  )
}

export default BookAbout
