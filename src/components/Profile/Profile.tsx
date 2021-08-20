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
  updateAvatar: (file: File) => void
  updateProfileInfo: (profileData: ProfileInfoType) => void
}

export const Profile: React.FC<PropsType> = (props) => {
  const { profile, status, updateProfileStatus, updateAvatar, updateProfileInfo } = props

  return (
    <div>
      <ProfileInfo
        updateProfileInfo={updateProfileInfo}
        profile={profile}
        status={status}
        updateProfileStatus={updateProfileStatus}
        updateAvatar={updateAvatar}
      />
      <MyPosts {...props} />
    </div>
  )
}
