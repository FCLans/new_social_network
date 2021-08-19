import { AuthApi } from '../api/api'
import { AppDispatch } from './reduxStore'
import { MeDataType } from '../types/apiTypes'
import { stopSubmit } from 'redux-form'

const SET_AUTH_DATA = 'AUTH/SET_AUTH_DATA'

type StateType = {
  data: MeDataType
  isAuth: boolean
}

const initialState: StateType = {
  isAuth: false,
  data: {} as MeDataType,
}

export const authReducer = (state = initialState, action: ActionCreatorsType) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        data: action.data,
        isAuth: action.isAuth,
      }

    default:
      return state
  }
}

//Actions
const setAuthDataAC = (id: number, email: string, login: string, isAuth: boolean) => {
  return {
    type: SET_AUTH_DATA,
    data: { id, email, login },
    isAuth: isAuth,
  }
}

//Action Types
type setAuthDataACType = {
  type: typeof SET_AUTH_DATA
  data: MeDataType
  isAuth: boolean
}

//ActionCreatorsType
type ActionCreatorsType = setAuthDataACType

//Thunk Creators
export const setAuthDataTC = (): any => {
  return async (dispatch: AppDispatch) => {
    const data = await AuthApi.me()

    if (data.resultCode === 0) {
      const { id, email, login } = data.data
      dispatch(setAuthDataAC(id, email, login, true))
    }

    return data
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): any => {
  return async (dispatch: AppDispatch) => {
    AuthApi.login(email, password, (rememberMe = false)).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthDataTC())
      } else {
        dispatch(stopSubmit('login', { _error: data.messages[0] }))
      }
    })
  }
}

export const logoutTC = (): any => {
  return async (dispatch: AppDispatch) => {
    const data = await AuthApi.logout()

    if (data.resultCode === 0) {
      dispatch(setAuthDataAC(null, '', '', false))
    }
  }
}
