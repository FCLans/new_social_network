import { sendMessageActionCreator } from '../../redux/dialogsReducer'
import { Dialogs } from './Dialogs'
import { connect } from 'react-redux'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { compose } from 'redux'
import { withRedirect } from '../hoc/withRedirect'
import { getDialogsData, getMessagesData } from '../../redux/selectors/dialogsSelector'

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: getDialogsData(state),
    messagesData: getMessagesData(state),
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
