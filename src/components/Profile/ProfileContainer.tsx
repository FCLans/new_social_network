import * as React from 'react'
import { connect } from 'react-redux'
import { addPostActionCreator, editNewPostTextActionCreator, getProfileInfoTC } from '../../redux/profileReducer'
import Profile from './Profile'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useEffect } from 'react'

type ParamsRouter = {
  userId?: string
}

type PropsType = RouteComponentProps<ParamsRouter> & {
  newPostText: string
  postsData: Array<PostDataType>
  profile: ProfileInfoType

  editNewPostText: (text: string) => void
  getProfileData: (userId: number) => void
  addPost: () => void
}

const ProfileC = (props: PropsType) => {
  useEffect(() => {
    let userId: number = +props.match.params.userId
    if (!userId) {
      userId = 1
    }
    props.getProfileData(userId)
  }, [])

  return <Profile {...props} />
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
    getProfileData: (userId: number) => dispatch(getProfileInfoTC(userId)),
  }
}

const ProfileContainerWithRouter = withRouter(ProfileC)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRouter)
