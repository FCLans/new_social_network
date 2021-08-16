import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { AppDispatch, AppStateType } from '../../../redux/reduxStore'
import { loginTC } from '../../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isRequired, maxLength } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControls/FormsControls'

const maxLength20 = maxLength(20)

const LoginForm: React.FC<InjectedFormProps> = (props) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field type="text" placeholder="Введи логин" component={Input} name="email" validate={[isRequired, maxLength20]} />
      </div>
      <div>
        <Field type="password" placeholder="Введи пароль" component={Input} name="password" validate={[isRequired, maxLength20]} />
      </div>
      <div>
        <Field type="checkbox" component={Input} name="rememberMe" />
        Запомнить меня
      </div>
      <div>
        <button>Войти</button>
      </div>
    </form>
  )
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
  connect(mapDispatchToProps),
  reduxForm({
    form: 'login',
  })
)(LoginForm)
