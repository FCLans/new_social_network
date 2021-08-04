import Dialog from './Dialog/Dialog'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
import * as React from 'react'
import {DialogsDataType, MessagesDataType} from '../../types/types'

type PropsType = {
  dialogsData: Array<DialogsDataType>
  messagesData: Array<MessagesDataType>
  newMessageText: string
  sendNewMessage: () => void
  editNewTextMessage: (e: any) => void
}

const Dialogs: React.FC<PropsType> = ({dialogsData, messagesData,
                                        newMessageText, sendNewMessage,
                                        editNewTextMessage}) => {
  debugger
  let dialogsElements = dialogsData.map(d => <Dialog key={d.id} name={d.name} id={d.id}/>)
  let messagesElements = messagesData.map(m => <Message key={m.id} text={m.text}/>)

  const onChangeText = (e: any) => {
    editNewTextMessage(e.target.value)
  }

  const sendMessage = () => {
    sendNewMessage()
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <br/>
        <div>
          <div><textarea onChange={onChangeText} value={newMessageText}/></div>
          <div>
            <button onClick={sendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
