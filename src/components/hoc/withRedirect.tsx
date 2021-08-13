import * as React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'
import { Redirect } from 'react-router-dom'

type Props = {
  isAuth: boolean
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  }
}

export const withRedirect = (WrappedComponent: any) => {
  const WrapComponent = (props: Props) => {
    if (!props.isAuth) {
      return <Redirect to={'/login'} />
    }
    return <WrappedComponent {...props} />
  }

  return connect(mapStateToProps)(WrapComponent)
}
