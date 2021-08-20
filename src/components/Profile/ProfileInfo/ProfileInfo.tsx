import { Loader } from '../../common/Loader/Loader'
import * as React from 'react'
import { ProfileInfoType } from '../../../types/types'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import styles from './ProfileInfo.module.css'
import { ChangeEvent, useState } from 'react'
import { ProfileInfoData } from './ProfileInfoData'
import { ProfileInfoFormRedux } from './ProfileInfoForm'

type PropsType = {
  profile: ProfileInfoType
  status: string

  updateProfileStatus: (status: string) => void
  updateAvatar: (file: File) => void
  updateProfileInfo: (profileData: ProfileInfoType) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  const { profile, status, updateProfileStatus, updateAvatar, updateProfileInfo } = props
  const [editMode, setEditMode] = useState(false)

  if (!profile.fullName) {
    return <Loader />
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length > 0) {
      updateAvatar(e.target.files[0])
    }
  }

  const saveDataProfile = (formData: ProfileInfoType) => {
    updateProfileInfo(formData)
    setEditMode(false)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const profileFormRedux = <ProfileInfoFormRedux onSubmit={saveDataProfile} contacts={profile.contacts} initialValues={profile} />

  return (
    <div>
      <div>
        <img src="https://school48tmn.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg" alt="img" />
      </div>
      <div className={styles.descriptions}>
        <div>
          <h3>{profile.fullName}</h3>
        </div>
        <div>
          <img src={profile.photos.large} alt="avatar" />
          <div className={styles.avatar}>
            <input type="file" onChange={onFileChange} />
          </div>
        </div>
        <ProfileStatus propsStatus={status} updateProfileStatus={updateProfileStatus} />
        {editMode ? profileFormRedux : <ProfileInfoData profile={profile} />}
        {!editMode && <button onClick={() => setEditMode(true)}>Редактировать</button>}
      </div>
    </div>
  )
}

export default ProfileInfo
