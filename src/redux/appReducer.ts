import { setAuthDataTC } from './authReducer'
import { AppStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

const initialState = {
  initialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsCreatorsType): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

//Actions Types
type ActionsCreatorsType = InitializedACType
type InitializedACType = {
  type: typeof INITIALIZED_SUCCESS
}

//Action Creators
const initializedAC = (): InitializedACType => {
  return {
    type: INITIALIZED_SUCCESS,
  }
}

//Thunk Creators Type
type ThunkCreatorsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsCreatorsType>

//Thunk Creators
export const initializedSuccess = (): ThunkCreatorsType => async (dispatch) => {
  const promise = dispatch(setAuthDataTC())
  promise.then(() => dispatch(initializedAC()))
}
