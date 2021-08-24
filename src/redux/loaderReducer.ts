const TOGGLE_IS_LOAD_PAGE = 'TOGGLE_IS_LOAD_PAGE'

const initialState = {
  isLoadPage: false,
}

export type InitialStateType = typeof initialState

//reducer
const loaderReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case TOGGLE_IS_LOAD_PAGE:
      return { ...state, isLoadPage: action.data }
    default:
      return state
  }
}

//Action Types
type ActionTypes = ToggleIsLoadPageACType

export type ToggleIsLoadPageACType = {
  type: typeof TOGGLE_IS_LOAD_PAGE
  data: boolean
}

//Action Creators
export const toggleIsLoadPageAC = (isLoadPage: boolean): ToggleIsLoadPageACType => {
  return { type: TOGGLE_IS_LOAD_PAGE, data: isLoadPage }
}

export default loaderReducer
