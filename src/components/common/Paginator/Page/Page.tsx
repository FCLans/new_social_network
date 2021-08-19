import * as React from 'react'
import styles from '../Paginator.module.css'

type PropsType = {
  numberPage: number
  currentPage: number

  onClickPage: (numberPage: number) => void
}

export const Page = (props: PropsType) => {
  const { numberPage, onClickPage, currentPage } = props
  const selectedPageStyle = currentPage === numberPage ? styles.selectedPage : null

  return (
    <div className={styles.page + ' ' + selectedPageStyle} onClick={() => onClickPage(numberPage)}>
      <span>{numberPage}</span>
    </div>
  )
}
