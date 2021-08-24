import styles from './MyPosts.module.css'
import Post from './Post/Post'
import * as React from 'react'
import { PostDataType } from '../../../types/types'
import { NewPostFormRedux } from './NewPostForm/NewPostForm'

type PropsType = {
  postsData: Array<PostDataType>

  addPost: (text: string) => void
}

// eslint-disable-next-line react/display-name
const MyPosts = React.memo(({ postsData, addPost }: PropsType) => {
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
})

export default MyPosts
