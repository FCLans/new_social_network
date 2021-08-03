import Dialog from './Dialog/Dialog'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
import React from 'react'

const Dialogs = props => {
  debugger
  let dialogsElements = props.dialogsData.map(d => <Dialog key={d.id} name={d.name} id={d.id}/>)
  let messagesElements = props.messagesData.map(m => <Message key={m.id} text={m.text}/>)

  const onChangeText = (e) => {
    props.editNewTextMessage(e.target.value)
  }

  const sendMessage = () => {
    props.sendNewMessage()
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <br/>
        <div>
          <div><textarea onChange={onChangeText} value={props.newMessageText}/></div>
          <div>
            <button onClick={sendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
