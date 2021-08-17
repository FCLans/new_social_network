import * as React from 'react'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { Header } from './Header'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { logoutTC, setAuthDataTC } from '../../redux/authReducer'
import { MeDataType } from '../../types/apiTypes'

type Props = {
  isAuth: boolean
  data: MeDataType

  setAuthData: () => void
  logout: () => void
}

const HeaderC = (props: Props) => {
  useEffect(() => {
    props.setAuthData()
  }, [props.isAuth])
  return <Header {...props} />
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    data: state.auth.data,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setAuthData: () => dispatch(setAuthDataTC()),
    logout: () => dispatch(logoutTC()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderC)
