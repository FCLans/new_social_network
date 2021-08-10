import { editNewMessageTextActionCreator, sendMessageActionCreator } from '../../redux/dialogsReducer'
import { Dialogs } from './Dialogs'
import { connect } from 'react-redux'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'

const mapStateToProps = (state: AppStateType) => {
  return {
    newMessageText: state.dialogsPage.newMessageText,
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    editNewTextMessage: (text: string) => {
      dispatch(editNewMessageTextActionCreator(text))
    },
    sendNewMessage: () => {
      dispatch(sendMessageActionCreator())
    },
  }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
