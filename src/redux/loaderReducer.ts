const TOGGLE_IS_LOAD_PAGE = 'TOGGLE_IS_LOAD_PAGE'

const initialState = {
  isLoadPage: false
}

export type InitialStateType = typeof initialState

const loaderReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case TOGGLE_IS_LOAD_PAGE:
      return {...state, isLoadPage: action.data}
    default:
      return state
  }
}

type ToggleIsLoadPageAC = {
  type: typeof TOGGLE_IS_LOAD_PAGE
  data: boolean
}

export const toggleIsLoadPageAC = (isLoadPage: boolean): ToggleIsLoadPageAC => {
  return {type: TOGGLE_IS_LOAD_PAGE, data: isLoadPage}
}

export default loaderReducer