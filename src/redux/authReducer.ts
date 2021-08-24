import { AuthApi, ResultCodeEnum, ResultCodeForCaptcha, SecurityApi } from '../api/api'
import { AppStateType } from './reduxStore'
import { MeDataType } from '../types/apiTypes'
import { FormAction, stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

const SET_AUTH_DATA = 'AUTH/SET_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  isAuth: false,
  data: {} as MeDataType,
  captcha: null as string,
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionCreatorsType): InitialStateType => {
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

//Action Creators
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

//Thunk Creators Type
type ActionThunkType = ActionCreatorsType | FormAction
type ThunkCreatorsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionThunkType>

//Thunk Creators
export const setAuthDataTC = (): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await AuthApi.me()

    if (data.resultCode === ResultCodeEnum.Success) {
      const { id, email, login } = data.data
      dispatch(setAuthDataAC(id, email, login, true))
    }
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkCreatorsType => {
  return async (dispatch) => {
    AuthApi.login(email, password, (rememberMe = false), captcha).then((data) => {
      if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthDataTC())
        dispatch(getCaptchaUrlSuccessAC(null))
      } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
          dispatch(getCaptchaUrlTC())
        }
        dispatch(stopSubmit('login', { _error: data.messages[0] })) //FormAction from redux-form
      }
    })
  }
}

export const logoutTC = (): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await AuthApi.logout()

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(setAuthDataAC(null, '', '', false))
    }
  }
}

export const getCaptchaUrlTC = (): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await SecurityApi.getCaptchaUrl()

    dispatch(getCaptchaUrlSuccessAC(data.url))
  }
}
