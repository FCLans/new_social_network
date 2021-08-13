import styles from './Header.module.css'
import * as React from 'react'
import { MeDataType } from '../../types/apiTypes'
import { NavLink } from 'react-router-dom'

type Props = {
  isAuth: boolean
  data: MeDataType
}

export const Header: React.FC<Props> = (props) => {
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
      <div className={styles.login}>{props.isAuth ? <span>{props.data.login}</span> : <NavLink to={'/login'}>LOGIN</NavLink>}</div>
    </div>
  )
}
