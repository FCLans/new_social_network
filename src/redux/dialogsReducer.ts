import { DialogsDataType, MessagesDataType } from '../types/types'

const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

const initialState = {
  messagesData: [
    { id: 1, text: 'привет' },
    { id: 2, text: 'Ты тут?' },
    { id: 3, text: 'Возможно, что да' },
    { id: 4, text: 'А как?' },
    { id: 5, text: 'Ну вот)))' },
  ] as Array<MessagesDataType>,
  dialogsData: [
    { id: 1, name: 'Иван' },
    { id: 2, name: 'Петро' },
    { id: 3, name: 'Андрей' },
    { id: 4, name: 'Юлия' },
    { id: 5, name: 'Капуста' },
  ] as Array<DialogsDataType>,
}

export type InitialStateType = typeof initialState

//reducer
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessage = {
        id: state.messagesData.length + 1,
        text: action.messageText,
      }

      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      }
    }

    default:
      return state
  }
}

//Action Types
type ActionsType = SendMessageActionCreatorType

type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE
  messageText: string
}

//Action Creators
export const sendMessageActionCreator = (text: string): SendMessageActionCreatorType => ({ type: SEND_MESSAGE, messageText: text })

export default dialogsReducer
