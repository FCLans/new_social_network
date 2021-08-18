import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import * as React from 'react'
import { PostDataType, ProfileInfoType } from '../../types/types'

type PropsType = {
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  status: string

  addPost: () => void
  updateProfileStatus: (status: string) => void
}

export const Profile: React.FC<PropsType> = (props) => {
  const { profile, status, updateProfileStatus } = props

  return (
    <div>
      <ProfileInfo profile={profile} status={status} updateProfileStatus={updateProfileStatus} />
      <MyPosts {...props} />
    </div>
  )
}
