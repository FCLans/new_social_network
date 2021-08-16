import { setAuthDataTC } from './authReducer'
import { AppDispatch } from './reduxStore'

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

const initialState = {
  initialized: false,
}

export const appReducer = (state = initialState, action: ActionsCreatorsType) => {
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
type ActionsCreatorsType = initializedAC
type initializedAC = {
  type: typeof INITIALIZED_SUCCESS
}

//Action Creators
const initializedAC = () => {
  return {
    type: INITIALIZED_SUCCESS,
  }
}

//Thunk Creators
export const initializedSuccess = (): any => (dispatch: AppDispatch) => {
  const promise = dispatch(setAuthDataTC())

  promise.then(() => {
    dispatch(initializedAC())
  })
}
