import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'

const initialState = {
  editMode: false,
  status: null as string,
}

export const ProfileStatus = (props: any) => {
  const [localState, setLocalState] = useState(initialState)
  useEffect(() => {
    setLocalState({
      ...localState,
      status: props.status,
    })
  }, [])

  const toggleEditMode = () => {
    setLocalState({
      ...localState,
      editMode: true,
    })
  }
  const sendStatus = () => {
    setLocalState({
      ...localState,
      editMode: false,
    })
    props.updateProfileStatus(localState.status)
  }
  const changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalState({
      ...localState,
      status: e.target.value,
    })
  }

  return (
    <div onDoubleClick={toggleEditMode}>
      {localState.editMode && (
        <input onChange={changeStatusText} type="text" value={localState.status} autoFocus={true} onBlur={sendStatus} />
      )}
      {!localState.editMode && <span>{props.status ? props.status : 'Статус отсутствует'}</span>}
    </div>
  )
}
