import styles from '../Dialogs.module.css'
import {NavLink} from 'react-router-dom'
import React from "react";

const Dialog = props => {
  let name = props.name
  let path = '/messages/' + props.id

  return (
    <div className={styles.dialog}>
      <NavLink activeClassName={styles.active} to={path}>
        {name}
      </NavLink>
    </div>
  )
}

export default Dialog
