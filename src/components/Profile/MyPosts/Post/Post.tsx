import styles from './Post.module.css'
import * as React from "react";

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.item}>
      <img className={styles.avatar} src="https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg"
           alt=""/>
      <div className={styles.comment}>{props.message}</div>
      <button className={styles.like_btn}>Like</button>
      {props.likesCount ? <div className={styles.like_count}>{props.likesCount}</div> : <div>Еще нет лайков</div>}
    </div>
  )
}

export default Post
