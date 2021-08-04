import * as React from 'react';
import styles from './Sidebar.module.css'
import Friends from './Friends/Friends';

type PropsType = {

}

const Sidebar: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.sidebarBlock}>
      <Friends/>
    </div>
  )
}

export default Sidebar;