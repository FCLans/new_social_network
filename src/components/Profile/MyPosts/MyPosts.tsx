import styles from './MyPosts.module.css'
import Post from './Post/Post'
import * as React from 'react'
import { PostDataType } from '../../../types/types'
import { ChangeEvent } from 'react'

type PropsType = {
  postsData: Array<PostDataType>
  newPostText: string

  editNewPostText: (text: string) => void
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = ({ newPostText, postsData, addPost, editNewPostText }) => {
  const postsElements = postsData.map((p) => {
    return <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  })

  const changeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editNewPostText(e.target.value)
  }

  const addNewPost = () => {
    addPost(newPostText)
    editNewPostText('')
  }

  return (
    <div>
      <div>
        <textarea onChange={changeNewPostText} value={newPostText} />
      </div>

      <div>
        <button onClick={addNewPost}>Add post</button>
      </div>

      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
