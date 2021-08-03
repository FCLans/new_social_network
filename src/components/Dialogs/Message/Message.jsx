import styles from '../Dialogs.module.css'
import React from "react";

const Message = props => {
  return <div className={styles.message}>{props.text}</div>
}

export default Message
