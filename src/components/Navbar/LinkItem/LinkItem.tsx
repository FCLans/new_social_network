import { NavLink } from 'react-router-dom'
import styles from './LinkItem.module.css'
import * as React from 'react'

type PropsType = {
  name: string
  path: string
}

export const LinkItem: React.FC<PropsType> = ({ path, name }) => {
  return (
    <div className={styles.item}>
      <NavLink activeClassName={styles.active} to={path}>
        {name}
      </NavLink>
    </div>
  )
}
