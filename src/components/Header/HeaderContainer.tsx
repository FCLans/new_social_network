import * as React from 'react'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { Header } from './Header'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { setAuthData } from '../../redux/authReducer'
import { MeDataType } from '../../types/apiTypes'

type Props = {
  isAuth: boolean
  data: MeDataType
  setAuthData: () => void
}

const HeaderC = (props: Props) => {
  useEffect(() => {
    props.setAuthData()
  }, [])
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
    setAuthData: () => dispatch(setAuthData()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderC)
