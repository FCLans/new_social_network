import styles from './ProfileInfo.module.css'
import { Loader } from '../../common/Loader/Loader'
import * as React from 'react'
import { LocationType } from '../../../types/types'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

type PropsType = {
  userId: number
  fullName: string
  lookingForAJob?: boolean
  lookingForAJobDescription: string
  photos: {
    large: string
    small?: string
  }
  location: LocationType
  status: string

  updateProfileStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  if (!props.fullName) {
    return <Loader />
  }

  return (
    <div>
      <div>
        <img src="https://school48tmn.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg" alt="img" />
      </div>
      <div className={styles.descriptions}>
        <div>
          <h3>{props.fullName}</h3>
        </div>
        <div>
          <img src={props.photos.large} alt="avatar" />
        </div>
        <div>{props.lookingForAJobDescription}</div>
        <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
