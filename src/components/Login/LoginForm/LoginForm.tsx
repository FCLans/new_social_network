import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { AppDispatch, AppStateType } from '../../../redux/reduxStore'
import { loginTC } from '../../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isRequired, maxLength } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControls/FormsControls'
import styles from '../../common/FormsControls/FormsControls.module.css'

const maxLength40 = maxLength(40)

const LoginForm: React.FC<InjectedFormProps> = (props) => {
  const { handleSubmit, error } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field type="text" placeholder="Введи логин" component={Input} name="email" validate={[isRequired, maxLength40]} />
      </div>
      <div>
        <Field type="password" placeholder="Введи пароль" component={Input} name="password" validate={[isRequired, maxLength40]} />
      </div>
      <div>
        <Field type="checkbox" component={Input} name="rememberMe" />
        Запомнить меня
      </div>
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onSubmit: ({ email, password, rememberMe }: FormData) => dispatch(loginTC(email, password, rememberMe)),
  }
}

export const LoginFormRedux = compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'login',
  })
)(LoginForm)
