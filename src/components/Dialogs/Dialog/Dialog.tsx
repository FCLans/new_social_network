import styles from '../Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import * as React from 'react'

type PropsType = {
  name: string
  id: number
}

export const Dialog: React.FC<PropsType> = ({ name, id }) => {
  const path = '/messages/' + id

  return (
    <div className={styles.dialog}>
      <NavLink activeClassName={styles.active} to={path}>
        {name}
      </NavLink>
    </div>
  )
}
