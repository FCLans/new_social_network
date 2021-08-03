const SEND_MESSAGE = 'SEND_MESSAGE'
const EDIT_NEW_MESSAGE_TEXT = 'EDIT_NEW_MESSAGE_TEXT'

const initialState = {
  messagesData: [
    {id: 1, text: 'привет'},
    {id: 2, text: 'Ты тут?'},
    {id: 3, text: 'Возможно, что да'},
    {id: 4, text: 'А как?'},
    {id: 5, text: 'Ну вот)))'},
  ],
  dialogsData: [
    {id: 1, name: 'Иван'},
    {id: 2, name: 'Петро'},
    {id: 3, name: 'Андрей'},
    {id: 4, name: 'Юлия'},
    {id: 5, name: 'Капуста'},
  ],
  newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})
export const editNewMessageTextActionCreator = (text) => ({type: EDIT_NEW_MESSAGE_TEXT, data: text})

export default dialogsReducer;