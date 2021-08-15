import styles from './MyPosts.module.css'
import Post from './Post/Post'
import * as React from 'react'
import { PostDataType } from '../../../types/types'
import { ChangeEvent } from 'react'
import { NewPostFormRedux } from './NewPostForm/NewPostForm'

type PropsType = {
  postsData: Array<PostDataType>

  addPost: (FormData: any) => void
}

const MyPosts: React.FC<PropsType> = ({ postsData, addPost }) => {
  const postsElements = postsData.map((p) => {
    return <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  })

  const addNewPost = (FormData: any) => {
    addPost(FormData.text)
  }

  return (
    <div>
      <NewPostFormRedux onSubmit={addNewPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
