import styles from './ProfileInfo.module.css'
import Loader from "../../common/Loader/Loader";
import React from "react";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Loader />
  }

  return (
    <div>
      <div>
        <img src="https://school48tmn.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg"
             alt="img"/>
      </div>
      <div className={styles.descriptions}>
        <div><h3>{props.profile.name}</h3></div>
        <div><img src={props.profile.image} alt="avatar"/></div>
        <div>{props.profile.species}</div>
        <div>{props.profile.gender}</div>
        <div>{props.profile.location.name}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
