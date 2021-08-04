const SEND_MESSAGE = 'SEND_MESSAGE'
const EDIT_NEW_MESSAGE_TEXT = 'EDIT_NEW_MESSAGE_TEXT'

type MessagesDataType = {
  id: number
  text: string
}

type DialogsDataType = {
  id: number
  name: string
}

const initialState = {
  messagesData: [
    {id: 1, text: 'привет'},
    {id: 2, text: 'Ты тут?'},
    {id: 3, text: 'Возможно, что да'},
    {id: 4, text: 'А как?'},
    {id: 5, text: 'Ну вот)))'},
  ] as Array<MessagesDataType>,
  dialogsData: [
    {id: 1, name: 'Иван'},
    {id: 2, name: 'Петро'},
    {id: 3, name: 'Андрей'},
    {id: 4, name: 'Юлия'},
    {id: 5, name: 'Капуста'},
  ] as Array<DialogsDataType>,
  newMessageText: ''
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let indexLastElement = state.messagesData.length - 1
      let newIdElement = state.messagesData[indexLastElement].id + 1

      let newMessage = {
        id: newIdElement,
        text: state.newMessageText
      }

      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
        newMessageText: ''
      }

    case EDIT_NEW_MESSAGE_TEXT:
      return {
        ...state, newMessageText: action.data
      }

    default:
      return state
  }
}

type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE
}
type EditNewMessageTextActionCreatorType = {
  type: typeof EDIT_NEW_MESSAGE_TEXT
  data: string
}

export const sendMessageActionCreator = (): SendMessageActionCreatorType => ({type: SEND_MESSAGE})
export const editNewMessageTextActionCreator = (text: string): EditNewMessageTextActionCreatorType => ({type: EDIT_NEW_MESSAGE_TEXT, data: text})

export default dialogsReducer;