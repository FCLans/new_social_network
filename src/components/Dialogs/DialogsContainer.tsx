import { editNewMessageTextActionCreator, sendMessageActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'
import { Dispatch } from 'react'

const mapStateToProps = (state: AppStateType) => {
  return {
    newMessageText: state.dialogsPage.newMessageText,
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    editNewTextMessage: (text: string) => {
      dispatch(editNewMessageTextActionCreator(text))
    },
    sendNewMessage: () => {
      dispatch(sendMessageActionCreator())
    },
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
