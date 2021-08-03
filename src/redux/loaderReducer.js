const TOGGLE_IS_LOAD_PAGE = 'TOGGLE_IS_LOAD_PAGE'

const initialState = {
  isLoadPage: false
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_LOAD_PAGE:
      return {...state, isLoadPage: action.data}
    default:
      return state
  }
}

export const toggleIsLoadPageAC = (isLoadPage) => {
  return {type: TOGGLE_IS_LOAD_PAGE, data: isLoadPage}
}

export default loaderReducer