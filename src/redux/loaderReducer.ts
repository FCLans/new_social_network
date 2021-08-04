const TOGGLE_IS_LOAD_PAGE = 'TOGGLE_IS_LOAD_PAGE'

const initialState = {
  isLoadPage: false
}

export type initialStateType = typeof initialState

const loaderReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case TOGGLE_IS_LOAD_PAGE:
      return {...state, isLoadPage: action.data}
    default:
      return state
  }
}

export const toggleIsLoadPageAC = (isLoadPage: boolean) => {
  return {type: TOGGLE_IS_LOAD_PAGE, data: isLoadPage}
}

export default loaderReducer