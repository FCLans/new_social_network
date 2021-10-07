import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import * as React from 'react'
import { PostDataType, ProfileInfoType } from '../../types/types'

type PropsType = {
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  status: string
  userId: number

  addPost: (text: string) => void
  updateProfileStatus: (status: string, userId: number) => void
  updateAvatar: (file: File) => void
  updateProfileInfo: (profileData: ProfileInfoType) => void
}

export const Profile: React.FC<PropsType> = (props) => {
  const { profile, status, updateProfileStatus, updateAvatar, updateProfileInfo, userId } = props

  return (
    <div>
      <ProfileInfo
        updateProfileInfo={updateProfileInfo}
        profile={profile}
        status={status}
        updateProfileStatus={updateProfileStatus}
        updateAvatar={updateAvatar}
        userId={userId}
      />
      <MyPosts {...props} />
    </div>
  )
}
