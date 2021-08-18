import styles from './ProfileInfo.module.css'
import { Loader } from '../../common/Loader/Loader'
import * as React from 'react'
import { ProfileInfoType } from '../../../types/types'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

type PropsType = {
  profile: ProfileInfoType
  status: string

  updateProfileStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  const { profile, status, updateProfileStatus } = props

  if (!profile.fullName) {
    return <Loader />
  }

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
        </div>
        <div>{profile.lookingForAJobDescription}</div>
        <ProfileStatus propsStatus={status} updateProfileStatus={updateProfileStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
