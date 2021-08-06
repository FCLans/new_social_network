import * as React from 'react'
import { connect } from 'react-redux'
import { addPostActionCreator, editNewPostTextActionCreator, setProfileInfoAC } from '../../redux/profileReducer'
import Profile from './Profile'
import { api } from '../../api/api'
import { AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'

type PropsType = {
  newPostText: string
  postsData: Array<PostDataType>
  profile: ProfileInfoType

  editNewPostText: (text: string) => void
  setProfileData: (data: ProfileInfoType) => void
  addPost: () => void
}

class ProfileContainer extends React.Component<PropsType> {
  async componentDidMount() {
    const data = await api.getUserInfo(2)

    this.props.setProfileData(data)
  }

  render() {
    return <Profile {...this.props} />
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profileInfo,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    editNewPostText: (text: string) => {
      dispatch(editNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    },
    setProfileData: (data: ProfileInfoType) => {
      dispatch(setProfileInfoAC(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
