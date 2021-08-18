import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { AppDispatch, AppStateType } from '../../../redux/reduxStore'
import { loginTC } from '../../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isRequired, maxLength } from '../../../utils/validators/validators'
import { createField, Input } from '../../common/FormsControls/FormsControls'
import styles from '../../common/FormsControls/FormsControls.module.css'
import { Redirect } from 'react-router-dom'

const maxLength40 = maxLength(40)

type PropsType = {
  isAuth: boolean

  onSubmit: ({ email, password, rememberMe }: FormData) => void
}

const LoginForm: React.FC<InjectedFormProps & PropsType> = (props) => {
  const { handleSubmit, error } = props

  if (props.isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <form onSubmit={handleSubmit}>
      {createField('email', [isRequired, maxLength40], Input, { type: 'text' })}
      {createField('password', [isRequired, maxLength40], Input, { type: 'password' })}
      {createField('rememberMe', null, Input, { type: 'checkbox' }, 'Запомнить меня')}
      <div>
        <button>Войти</button>
      </div>
      {error ? <div className={styles.formsCommonError}>{error}</div> : null}
    </form>
  )
}

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

const mapStateToProps = (state: AppStateType) => ({ isAuth: state.auth.isAuth })

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onSubmit: ({ email, password, rememberMe }: FormData) => dispatch(loginTC(email, password, rememberMe)),
  }
}

export const LoginFormRedux = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'login',
  })
)(LoginForm)