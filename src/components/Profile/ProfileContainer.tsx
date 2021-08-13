import * as React from 'react'
import { connect } from 'react-redux'
import { addPostActionCreator, getProfileInfoTC, getProfileStatusTC, updateProfileStatusTC } from '../../redux/profileReducer'
import { Profile } from './Profile'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRedirect } from '../hoc/withRedirect'

type ParamsRouter = {
  userId?: string
}

type PropsType = RouteComponentProps<ParamsRouter> & {
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  status: string
  myId: number
  getProfileStatus: (userId: number) => void
  getProfileData: (userId: number) => void
  addPost: () => void
  updateProfileStatus: (status: string) => void
}

const ProfileC = (props: PropsType) => {
  const [newPostText, editNewPostText] = useState('')
  useEffect(() => {
    let userId: number = +props.match.params.userId
    if (!userId) {
      userId = props.myId
    }
    props.getProfileData(userId)
    props.getProfileStatus(userId)
  }, [props.myId])

  return <Profile {...props} newPostText={newPostText} editNewPostText={editNewPostText} />
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profileInfo,
    status: state.profilePage.status,
    myId: state.auth.data.id,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addPost: (text: string) => {
      dispatch(addPostActionCreator(text))
    },
    getProfileData: (userId: number) => dispatch(getProfileInfoTC(userId)),
    getProfileStatus: (userId: number) => dispatch(getProfileStatusTC(userId)),
    updateProfileStatus: (status: string) => dispatch(updateProfileStatusTC(status)),
  }
}

export const ProfileContainer = compose(connect(mapStateToProps, mapDispatchToProps), withRedirect, withRouter)(ProfileC)
