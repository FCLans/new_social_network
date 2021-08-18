import * as React from 'react'
import styles from './FormsControls.module.css'
import { Field } from 'redux-form'

export const Input = ({ input, meta, ...otherProps }: any) => {
  const { touched, error } = meta

  const isError = touched && error

  return (
    <div className={styles.formsControls + ' ' + (isError ? styles.error : '')}>
      <div>
        <input {...input} {...otherProps} />
      </div>
      {isError ? <span>{error}</span> : null}
    </div>
  )
}

export const Textarea = ({ input, meta, ...otherProps }: any) => {
  const { touched, error } = meta

  const isError = touched && error

  return (
    <div className={styles.formsControls + ' ' + (isError ? styles.error : '')}>
      <div>
        <textarea {...input} {...otherProps} />
      </div>
      {isError ? <span>{error}</span> : null}
    </div>
  )
}

export const createField = (name: string, validators: Array<any> = [], component: any, props = {}, text = '') => {
  return (
    <div>
      <Field name={name} validate={validators} component={component} {...props} /> {text}
    </div>
  )
}
