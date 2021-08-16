import { sendMessageActionCreator } from '../../redux/dialogsReducer'
import { Dialogs } from './Dialogs'
import { connect } from 'react-redux'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { compose } from 'redux'
import { withRedirect } from '../hoc/withRedirect'

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    sendNewMessage: (text: string) => {
      dispatch(sendMessageActionCreator(text))
    },
  }
}

export const DialogsContainer = compose(connect(mapStateToProps, mapDispatchToProps), withRedirect)(Dialogs)
