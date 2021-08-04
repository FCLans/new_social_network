import styles from './Footer.module.css'
import * as React from "react";

type PropsType = {

}

const Footer: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.footer}>
      <div>FCLans</div>
    </div>
  )
}

export default Footer
