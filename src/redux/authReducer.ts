import { authApi } from '../api/api'
import { AppDispatch } from './reduxStore'
import { AuthMeType, MeDataType } from '../types/apiTypes'
import { stopSubmit } from 'redux-form'

const SET_AUTH_DATA = 'AUTH/SET_AUTH_DATA'

type State = {
  data: MeDataType
  isAuth: boolean
}

const initialState: State = {
  isAuth: false,
  data: {} as MeDataType,
}

export const authReducer = (state = initialState, action: ActionCreatorsType) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        data: action.data,
      }

    default:
      return state
  }
}

//Actions

const setAuthDataAC = ({ id, email, login }: MeDataType) => {
  return {
    type: SET_AUTH_DATA,
    data: { id, email, login },
  }
}

//Action Types
type setAuthDataACType = {
  type: typeof SET_AUTH_DATA
  data: MeDataType
}

//ActionCreatorsType
type ActionCreatorsType = setAuthDataACType

//Thunk Creators
export const setAuthDataTC = (): any => {
  return (dispatch: AppDispatch) => {
    authApi.me().then((data: AuthMeType) => {
      if (data.resultCode === 0) {
        dispatch(setAuthDataAC(data.data))
      }
    })
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): any => {
  return (dispatch: AppDispatch) => {
    authApi
      .login(email, password, (rememberMe = false))
      .then((res) => res.json())
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(setAuthDataTC())
        } else {
          dispatch(stopSubmit('login', { _error: data.messages[0] }))
        }
      })
  }
}
