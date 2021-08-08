import * as React from 'react'
import { connect } from 'react-redux'
import { addPostActionCreator, editNewPostTextActionCreator, setProfileInfoAC } from '../../redux/profileReducer'
import Profile from './Profile'
import { api } from '../../api/api'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'
import { RouteComponentProps, withRouter } from 'react-router-dom'

type ParamsRouter = {
  userId?: string
}

type PropsType = RouteComponentProps<ParamsRouter> & {
  newPostText: string
  postsData: Array<PostDataType>
  profile: ProfileInfoType

  editNewPostText: (text: string) => void
  setProfileData: (data: ProfileInfoType) => void
  addPost: () => void
}

class ProfileContainer extends React.Component<PropsType> {
  async componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = '1'
    }
    const data = await api.getUserInfo(+userId)

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

const mapDispatchToProps = (dispatch: AppDispatch) => {
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

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRouter)
