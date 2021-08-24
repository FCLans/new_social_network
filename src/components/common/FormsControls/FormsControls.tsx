import * as React from 'react'
import styles from './FormsControls.module.css'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form/lib/Field'

type InputFormType = {
  input: WrappedFieldInputProps
  meta: WrappedFieldMetaProps
}

export type FormData = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const Input: React.FC<InputFormType> = ({ input, meta, ...otherProps }) => {
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

export const Textarea: React.FC<InputFormType> = ({ input, meta, ...otherProps }) => {
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
