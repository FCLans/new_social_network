import React from 'react';
import styles from './Sidebar.module.css'
import Friends from './Friends/Friends';

const Sidebar = (props) => {
  return (
    <div className={styles.sidebarBlock}>
      <Friends/>
    </div>

  )
}

export default Sidebar;