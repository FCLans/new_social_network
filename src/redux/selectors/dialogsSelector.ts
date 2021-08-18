import { AppStateType } from '../reduxStore'

export const getDialogsData = (state: AppStateType) => {
  return state.dialogsPage.dialogsData
}

export const getMessagesData = (state: AppStateType) => {
  return state.dialogsPage.messagesData
}
