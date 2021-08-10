import * as React from 'react'
import styles from '../Users.module.css'
const userPhoto = require('../../../assets/img/user.jpg')
import { NavLink } from 'react-router-dom'
import { UserType } from '../../../types/types'

type PropsType = {
  user: UserType

  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

export const User: React.FC<PropsType> = ({ user, follow, unfollow }) => {
  return (
    <div className={styles.userBlock}>
      <div className={styles.leftBlock}>
        <div className={styles.avatar}>
          <NavLink to={`/profile/${user.id}`}>
            <img src={user.image ? user.image : userPhoto} alt="avatar" />
          </NavLink>
        </div>
        <div className={styles.following}>
          {user.followed ? (
            <button
              onClick={() => {
                unfollow(user.id)
              }}
            >
              Отписаться
            </button>
          ) : (
            <button
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
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userSpecies}>{user.species}</div>
          <div className={styles.userGender}>{user.gender}</div>
        </div>
        <div className={styles.locationBlock}>
          <div>{user.location.name}</div>
          {/*<div>{"user.location.country"}</div>*/}
        </div>
      </div>
    </div>
  )
}
