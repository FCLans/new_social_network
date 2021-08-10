import * as React from 'react'
import styles from './Sidebar.module.css'
import { Friends } from './Friends/Friends'

export const Sidebar = () => {
  return (
    <div className={styles.sidebarBlock}>
      <Friends />
    </div>
  )
}
