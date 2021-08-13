import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import * as React from 'react'
import { PostDataType, ProfileInfoType } from '../../types/types'

type PropsType = {
  newPostText: string
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  status: string

  editNewPostText: (text: string) => void
  addPost: () => void
}

export const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo {...props.profile} status={props.status} />
      <MyPosts {...props} />
    </div>
  )
}
