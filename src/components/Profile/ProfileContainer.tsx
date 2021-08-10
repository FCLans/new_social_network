import * as React from 'react'
import { connect } from 'react-redux'
import { addPostActionCreator, getProfileInfoTC } from '../../redux/profileReducer'
import Profile from './Profile'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'

type ParamsRouter = {
  userId?: string
}

type PropsType = RouteComponentProps<ParamsRouter> & {
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  getProfileData: (userId: number) => void
  addPost: () => void
}

const ProfileC = (props: PropsType) => {
  const [newPostText, editNewPostText] = useState('')
  useEffect(() => {
    let userId: number = +props.match.params.userId
    if (!userId) {
      userId = 1
    }
    props.getProfileData(userId)
  }, [])

  return <Profile {...props} newPostText={newPostText} editNewPostText={editNewPostText} />
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profileInfo,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addPost: (text: string) => {
      dispatch(addPostActionCreator(text))
    },
    getProfileData: (userId: number) => dispatch(getProfileInfoTC(userId)),
  }
}

const ProfileContainerWithRouter = withRouter(ProfileC)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRouter)
