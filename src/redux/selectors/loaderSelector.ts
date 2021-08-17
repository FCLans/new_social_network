import { AppStateType } from '../reduxStore'

export const getIsLoadPage = (state: AppStateType) => {
  return state.loader.isLoadPage
}
