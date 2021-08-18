import styles from './Header.module.css'
import * as React from 'react'
import { MeDataType } from '../../types/apiTypes'
import { NavLink } from 'react-router-dom'

type Props = {
  isAuth: boolean
  data: MeDataType

  logout: () => void
}

export const Header: React.FC<Props> = (props) => {
  const { isAuth, data, logout } = props

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1024px-BMW_logo_%28gray%29.svg.png"
          alt="logo"
        />
        <div className={styles.logo_text}>
          <span>СОЦИАЛЬНАЯ СЕТЬ</span>
        </div>
      </div>
      <div className={styles.login}>
        {isAuth ? (
          <span>
            {data.login} - <button onClick={logout}>Выйти</button>
          </span>
        ) : (
          <NavLink to={'/login'}>Войти</NavLink>
        )}
      </div>
    </div>
  )
}
