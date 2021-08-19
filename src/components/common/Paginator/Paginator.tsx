import * as React from 'react'
import styles from './Paginator.module.css'
import { Page } from './Page/Page'
import { useState } from 'react'

type PropsType = {
  currentPage: number
  totalItemsCount: number
  pageSize: number
  portionSize: number

  onClickPage: (numberPage: number) => void
}

export const Paginator = (props: PropsType) => {
  const { onClickPage, currentPage, totalItemsCount, pageSize, portionSize = 10 } = props

  const pages = []
  const countPages = Math.ceil(totalItemsCount / pageSize)

  for (let i = 1; i <= countPages; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(countPages / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPageNumber = portionNumber * portionSize

  return (
    <div className={styles.pageBlock}>
      {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>{'<<<'}</button>}

      {pages
        .filter((pageNumber: number) => pageNumber >= leftPageNumber && pageNumber <= rightPageNumber)
        .map((pageNumber: number) => (
          <Page key={pageNumber} numberPage={pageNumber} currentPage={currentPage} onClickPage={onClickPage} />
        ))}

      {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>{'>>>'}</button>}
    </div>
  )
}
