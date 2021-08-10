import * as React from 'react'
import { User } from './User/User'
import styles from './Users.module.css'
import { UserType } from '../../types/types'

type PropsType = {
  currentPage: number
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number

  onClickPage: (numberPage: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

export const Users = (props: PropsType) => {
  const pages = []
  // const countPages = Math.ceil(props.totalUsersCount / props.pageSize)

  for (let i = 1; i <= 10; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.usersBlock}>
      <div>
        {pages.map((p) => {
          return (
            <span
              key={p}
              className={props.currentPage === p ? styles.selectedPage : null}
              onClick={() => {
                props.onClickPage(p)
              }}
            >
              {p}
            </span>
          )
        })}
      </div>
      {props.users.map((u) => (
        <User unfollow={props.unfollow} follow={props.follow} key={u.id} user={u} />
      ))}
    </div>
  )
}
