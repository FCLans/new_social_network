import styles from '../Dialogs.module.css'
import * as React from 'react'

type PropsType = {
  text: string
}

export const Message: React.FC<PropsType> = ({ text }) => {
  return <div className={styles.message}>{text}</div>
}
