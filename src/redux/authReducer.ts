import { authApi } from '../api/api'
import { AppDispatch } from './reduxStore'
import { AuthMeType, MeDataType } from '../types/apiTypes'

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
        isAuth: true,
        data: action.data,
      }

    default:
      return state
  }
}

//Actions
const setAuthDataAC = (data: MeDataType) => {
  return {
    type: SET_AUTH_DATA,
    data: data,
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
