import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from "./MyPosts/MyPosts";
import * as React from "react";
import {PostDataType, ProfileInfoType} from "../../types/types";

type PropsType = {
    newPostText: string
    postsData: Array<PostDataType>
    profile: ProfileInfoType

    editNewPostText: (text: string) => void
    addPost: () => void
}

const Profile: React.FC<PropsType> = props => {
  return (
    <div>
      <ProfileInfo {...props.profile}/>
      <MyPosts {...props} />
    </div>
  )
}

export default Profile
