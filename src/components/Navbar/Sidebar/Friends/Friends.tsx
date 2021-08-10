import * as React from 'react'
import styles from './Friends.module.css'

export const Friends = () => {
  return (
    <div className={styles.friendBlock}>
      <div className={styles.title}>Friends</div>
      <div className={styles.friends}>
        <div className={styles.friend}>
          <div className={styles.avatar}>
            <img src="https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt="avatar" />
          </div>
        </div>

        <div className={styles.friend}>
          <div className={styles.avatar}>
            <img src="https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt="avatar" />
          </div>
        </div>

        <div className={styles.friend}>
          <div className={styles.avatar}>
            <img src="https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}
