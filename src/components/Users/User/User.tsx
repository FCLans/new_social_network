import * as React from 'react'
import styles from '../Users.module.css'
const userPhoto = require('../../../assets/img/user.jpg').default
import { NavLink } from 'react-router-dom'
import { UserType } from '../../../types/types'

type PropsType = {
  user: UserType
  isFollowingProgress: Array<number>

  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

export const User: React.FC<PropsType> = ({ user, follow, unfollow, isFollowingProgress }) => {
  
  return (
    <div className={styles.userBlock}>
      <div className={styles.leftBlock}>
        <div className={styles.avatar}>
          <NavLink to={`/profile/${user.id}`}>
            <img src={`${user.photos?.small ? 'http://localhost:5000/' + user.photos?.small : userPhoto}`} alt="avatar" />
          </NavLink>
        </div>
        <div className={styles.following}>
          {user ? (
            <button
              disabled={isFollowingProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id)
              }}
            >
              Отписаться
            </button>
          ) : (
            <button
              disabled={isFollowingProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id)
              }}
            >
              Подписаться
            </button>
          )}
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.fullName}</div>
          <div className={styles.userSpecies}>{user.status}</div>
        </div>
        <div className={styles.locationBlock}>
          {/*<div>{user.location.name}</div>*/}
          {/*<div>{"user.location.country"}</div>*/}
        </div>
      </div>
    </div>
  )
}
