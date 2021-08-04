import styles from './MyPosts.module.css'
import Post from './Post/Post'
import * as React from 'react'
import {PostDataType} from '../../../types/types'

type PropsType = {
    postsData: Array<PostDataType>
    newPostText: string

    editNewPostText: (text: string) => void
    addPost: () => void
}

const MyPosts: React.FC<PropsType> = ({newPostText, postsData, addPost, editNewPostText}) => {
  let postsElements = postsData.map((p) => {
    return (
      <Post key={p.id} message={p.message} likesCount={p.likesCount} />
    )
  })

  const changeNewPostText = (e: any) => {
    editNewPostText(e.target.value)
  }

  const addNewPost = () => {
    addPost()
  }

  return (
    <div>
      <div>
        <textarea onChange={changeNewPostText} value={newPostText}/>
      </div>

      <div>
        <button onClick={addNewPost}>Add post</button>
      </div>

      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
