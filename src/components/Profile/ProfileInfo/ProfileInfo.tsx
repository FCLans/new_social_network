import styles from './ProfileInfo.module.css'
import { Loader } from '../../common/Loader/Loader'
import * as React from 'react'
import { ProfileInfoType } from '../../../types/types'

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
  if (!props.name) {
    return <Loader />
  }

  return (
    <div>
      <div>
        <img src="https://school48tmn.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg" alt="img" />
      </div>
      <div className={styles.descriptions}>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div>
          <img src={props.image} alt="avatar" />
        </div>
        <div>{props.species}</div>
        <div>{props.gender}</div>
        <div>{props.location.name}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
