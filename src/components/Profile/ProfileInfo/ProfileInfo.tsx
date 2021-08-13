import styles from './ProfileInfo.module.css'
import { Loader } from '../../common/Loader/Loader'
import * as React from 'react'
import { ProfileInfoType } from '../../../types/types'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
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
        <ProfileStatus status={props.status} />
      </div>
    </div>
  )
}

export default ProfileInfo
