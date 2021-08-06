import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'

const storeOld = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: 'Привет, мой первый пост!', likesCount: 120 },
        { id: 2, message: 'Разгоняемся и летим)))', likesCount: 20 },
      ],
      newPostText: '',
    },
    dialogsPage: {
      messagesData: [
        { id: 1, text: 'привет' },
        { id: 2, text: 'Ты тут?' },
        { id: 3, text: 'Возможно, что да' },
        { id: 4, text: 'А как?' },
        { id: 5, text: 'Ну вот)))' },
      ],
      dialogsData: [
        { id: 1, name: 'Иван' },
        { id: 2, name: 'Петро' },
        { id: 3, name: 'Андрей' },
        { id: 4, name: 'Юлия' },
        { id: 5, name: 'Капуста' },
      ],
      newMessageText: '',
    },
    sidebar: [],
  },
  _callSubscriber() {
    console.log('no subscribers (observers)')
  },

  subscribe(observer) {
    this._callSubscriber = observer
  },
  getState() {
    return this._state
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber()
  },
}

export default storeOld
