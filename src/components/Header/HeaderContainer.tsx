import * as React from 'react'
import { AppStateType } from '../../redux/reduxStore'
import { Header } from './Header'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { logoutTC, setAuthDataTC } from '../../redux/authReducer'
import { MeDataType } from '../../types/apiTypes'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

type PropsType = {
  isAuth: boolean
  data: MeDataType

  setAuthData: () => void
  logout: () => void
}

const HeaderC = (props: PropsType) => {
  const { isAuth, data, setAuthData, logout } = props

  useEffect(() => {
    setAuthData()
  }, [isAuth])
  return <Header data={data} logout={logout} isAuth={isAuth} />
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    data: state.auth.data,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, Action>) => {
  return {
    setAuthData: () => dispatch(setAuthDataTC()),
    logout: () => dispatch(logoutTC()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderC)
