import * as React from 'react'
import { ProfileInfoType } from '../../../types/types'
import styles from './ProfileInfo.module.css'

type PropsType = {
  profile: ProfileInfoType
}

export const ProfileInfoData = (props: PropsType) => {
  const { profile } = props
  return (
    <div>
      <div>
        <b>Полное имя:</b>
        {profile.fullName}
      </div>
      <div>
        <b>В поисках работы:</b>
        {profile.lookingForAJob ? 'Да' : 'Нет'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>Описание навыков:</b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Обо мне:</b>
        {profile.aboutMe}
      </div>
      <div>
        <b>Мои контакты:</b>
        <Contacts contacts={profile.contacts} />
      </div>
    </div>
  )
}

const Contacts = (props: any) => {
  const { contacts } = props
  return (
    <div className={styles.contacts}>
      {Object.keys(contacts).map((key: string) => {
        const contact = contacts[key]
        if (!contact) return

        return (
          <div key={key}>
            <b>{key}</b>: {contact}
          </div>
        )
      })}
    </div>
  )
}
