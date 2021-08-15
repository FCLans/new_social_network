import * as React from 'react'
import { reduxForm, Field } from 'redux-form'
import { AppDispatch, AppStateType } from '../../../redux/reduxStore'
import { loginTC } from '../../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'

const LoginForm = (props: any) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field type="text" placeholder="Введи логин" component="input" name="email" />
      </div>
      <div>
        <Field type="password" placeholder="Введи пароль" component="input" name="password" />
      </div>
      <div>
        <Field type="checkbox" component="input" name="rememberMe" />
        Запомнить меня
      </div>
      <div>
        <button>Войти</button>
      </div>
    </form>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {}
}

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

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
