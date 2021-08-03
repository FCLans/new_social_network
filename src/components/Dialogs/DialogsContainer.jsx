import {editNewMessageTextActionCreator, sendMessageActionCreator} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    newMessageText: state.dialogsPage.newMessageText,
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editNewTextMessage: (text) => {
      dispatch(editNewMessageTextActionCreator(text))
    },
    sendNewMessage: () => {
      dispatch(sendMessageActionCreator())
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
