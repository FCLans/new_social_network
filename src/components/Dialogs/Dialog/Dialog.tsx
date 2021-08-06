import styles from '../Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import * as React from 'react'

type PropsType = {
  name: string
  id: number
}

const Dialog: React.FC<PropsType> = (props) => {
  const name = props.name
  const path = '/messages/' + props.id

  return (
    <div className={styles.dialog}>
      <NavLink activeClassName={styles.active} to={path}>
        {name}
      </NavLink>
    </div>
  )
}

export default Dialog
