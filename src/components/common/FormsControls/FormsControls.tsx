import * as React from 'react'
import styles from './FormsControls.module.css'

export const Input = ({ input, meta, ...otherProps }: any) => {
  const isError = meta.touched && meta.error

  return (
    <div className={styles.formsControls + ' ' + (isError ? styles.error : '')}>
      <div>
        <input {...input} {...otherProps} />
      </div>
      {isError ? <span>{meta.error}</span> : null}
    </div>
  )
}

export const Textarea = ({ input, meta, ...otherProps }: any) => {
  const isError = meta.touched && meta.error

  return (
    <div className={styles.formsControls + ' ' + (isError ? styles.error : '')}>
      <div>
        <textarea {...input} {...otherProps} />
      </div>
      {isError ? <span>{meta.error}</span> : null}
    </div>
  )
}
