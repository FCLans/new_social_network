import styles from './MyPosts.module.css'
import Post from './Post/Post'
import React from 'react'

const MyPosts = props => {
  let postsElements = props.postsData.map((p) => {
    return (
      <Post key={p.id} message={p.message} likesCount={p.likesCount} />
    )
  })

  const changeNewPostText = e => {
    props.editNewPostText(e.target.value)
  }

  const addNewPost = () => {
    props.addPost()
  }

  return (
    <div>
      <div>
        <textarea onChange={changeNewPostText} value={props.newPostText}/>
      </div>

      <div>
        <button onClick={addNewPost}>Add post</button>
      </div>

      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
