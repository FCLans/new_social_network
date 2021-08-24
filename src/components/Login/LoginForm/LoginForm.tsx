import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { AppStateType } from '../../../redux/reduxStore'
import { loginTC } from '../../../redux/authReducer'
import { connect } from 'react-redux'
import { Action, compose } from 'redux'
import { isRequired, maxLength } from '../../../utils/validators/validators'
import { FormData, Input } from '../../common/FormsControls/FormsControls'
import styles from '../../common/FormsControls/FormsControls.module.css'
import { Redirect } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

const maxLength40 = maxLength(40)

type PropsType = {
  isAuth: boolean
  captcha: string
}

const LoginForm: React.FC<InjectedFormProps<FormData> & PropsType> = (props) => {
  const { handleSubmit, error, captcha } = props

  if (props.isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field placeholder="Логин" name="email" validate={[isRequired, maxLength40]} component={Input} />
      <Field placeholder="Пароль" name="password" validate={[isRequired, maxLength40]} component={Input} type="password" />
      {captcha ? (
        <div>
          <Field placeholder="Введи капчу" name="captcha" validate={[isRequired]} component={Input} />
          <div>
            <img src={captcha} />
          </div>
        </div>
      ) : null}
      <Field name="rememberMe" component={Input} type="checkbox" /> <span>Запомнить меня</span>
      <div>
        <button>Войти</button>
      </div>
      {error ? <div className={styles.formsCommonError}>{error}</div> : null}
    </form>
  )
}

const mapStateToProps = (state: AppStateType) => ({ isAuth: state.auth.isAuth, captcha: state.auth.captcha })

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, Action>) => {
  return {
    onSubmit: ({ email, password, rememberMe, captcha }: FormData) => {
      return dispatch(loginTC(email, password, rememberMe, captcha))
    },
  }
}

export const LoginFormRedux = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm<FormData>({
    form: 'login',
  })
)(LoginForm)
