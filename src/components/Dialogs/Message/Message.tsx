import styles from '../Dialogs.module.css'
import * as React from "react";

type PropsType = {
  text: string
}

const Message: React.FC<PropsType> = (props) => {
  return <div className={styles.message}>{props.text}</div>
}

export default Message