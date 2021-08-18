import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'

type PropsType = {
  propsStatus: string

  updateProfileStatus: (status: string) => void
}

export const ProfileStatus = (props: PropsType) => {
  const { propsStatus, updateProfileStatus } = props

  const [localStatus, setLocalStatus] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setLocalStatus(propsStatus)
  }, [propsStatus])

  const toggleEditMode = () => {
    setEditMode(true)
  }

  const sendStatus = () => {
    setEditMode(false)
    updateProfileStatus(localStatus)
  }

  const changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.target.value)
  }

  return (
    <div onDoubleClick={toggleEditMode}>
      {editMode && <input onChange={changeStatusText} type="text" value={localStatus} autoFocus={true} onBlur={sendStatus} />}
      {!editMode && <span>{propsStatus ? propsStatus : 'Статус отсутствует'}</span>}
    </div>
  )
}
