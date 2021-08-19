import * as React from 'react'
import { User } from './User/User'
import styles from './Users.module.css'
import { UserType } from '../../types/types'
import { Paginator } from '../common/Paginator/Paginator'

type PropsType = {
  currentPage: number
  users: Array<UserType>
  pageSize: number
  totalItemsCount: number
  isFollowingProgress: Array<number>

  onClickPage: (numberPage: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

export const Users = (props: PropsType) => {
  return (
    <div className={styles.usersBlock}>
      <Paginator
        currentPage={props.currentPage}
        onClickPage={props.onClickPage}
        totalItemsCount={props.totalItemsCount}
        pageSize={props.pageSize}
        portionSize={20}
      />
      {props.users.map((u) => (
        <User unfollow={props.unfollow} follow={props.follow} key={u.id} user={u} isFollowingProgress={props.isFollowingProgress} />
      ))}
    </div>
  )
}
