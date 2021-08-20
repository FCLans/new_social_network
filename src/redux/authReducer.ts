import { AuthApi, SecurityApi } from '../api/api'
import { AppDispatch } from './reduxStore'
import { MeDataType } from '../types/apiTypes'
import { stopSubmit } from 'redux-form'

const SET_AUTH_DATA = 'AUTH/SET_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET_CAPTCHA_URL_SUCCESS'

type StateType = {
  data: MeDataType
  isAuth: boolean
  captcha: string
}

const initialState: StateType = {
  isAuth: false,
  data: {} as MeDataType,
  captcha: null,
}

export const authReducer = (state = initialState, action: ActionCreatorsType) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        data: action.data,
        isAuth: action.isAuth,
      }
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captcha: action.url,
      }

    default:
      return state
  }
}

//Actions
const setAuthDataAC = (id: number, email: string, login: string, isAuth: boolean): setAuthDataACType => {
  return {
    type: SET_AUTH_DATA,
    data: { id, email, login },
    isAuth: isAuth,
  }
}
const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessACType => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    url: captchaUrl,
  }
}

//Action Types
type setAuthDataACType = {
  type: typeof SET_AUTH_DATA
  data: MeDataType
  isAuth: boolean
}
type getCaptchaUrlSuccessACType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  url: string
}

//ActionCreatorsType
type ActionCreatorsType = setAuthDataACType | getCaptchaUrlSuccessACType

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

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): any => {
  return async (dispatch: AppDispatch) => {
    AuthApi.login(email, password, (rememberMe = false), captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthDataTC())
        dispatch(getCaptchaUrlSuccessAC(null))
      } else {
        if (data.resultCode === 10) {
          dispatch(getCaptchaUrlTC())
        }
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

export const getCaptchaUrlTC = (): any => {
  return async (dispatch: AppDispatch) => {
    const data = await SecurityApi.getCaptchaUrl()
    dispatch(getCaptchaUrlSuccessAC(data.url))
  }
}
