import * as React from 'react'
import { connect } from 'react-redux'
import {
  addPostActionCreator,
  getProfileInfoTC,
  getProfileStatusTC, StatusType,
  updateAvatarTC,
  updateProfileInfoTC,
  updateProfileStatusTC,
} from '../../redux/profileReducer'
import { Profile } from './Profile'
import { AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileInfoType } from '../../types/types'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { Action, compose } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

type ParamsRouter = {
  userId?: string
}

type MapStateType = {
  postsData: Array<PostDataType>
  profile: ProfileInfoType
  status: string
  myId: number
}

type OwnPropsType = {}

type MapDispatchType = {
  getProfileStatus: (userId: number) => void
  getProfileData: (userId: number) => void
  addPost: (text: string) => void
  updateProfileStatus: (status: string) => void
  updateAvatar: (file: File) => void
  updateProfileInfo: (profileData: ProfileInfoType) => void
}

type PropsType = RouteComponentProps<ParamsRouter> & MapStateType & MapDispatchType & OwnPropsType

const ProfileC: React.FC<PropsType> = (props) => {
  const { getProfileStatus, getProfileData, myId, match, history } = props

  useEffect(() => {
    let userId: number = +match.params.userId
    if (!userId) {
      userId = myId
      if (!userId) {
        return history.push('/login')
      }
    }

    getProfileData(userId)
    getProfileStatus(userId)
  }, [match.params.userId])

  return <Profile {...props} />
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profileInfo,
    status: state.profilePage.status,
    myId: state.auth.data.id,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, Action>) => {
  return {
    addPost: (text: string) => {
      dispatch(addPostActionCreator(text))
    },
    getProfileData: (userId: number) => dispatch(getProfileInfoTC(userId)),
    getProfileStatus: (userId: number) => dispatch(getProfileStatusTC(userId)),
    updateProfileStatus: (status: string) => dispatch(updateProfileStatusTC(status)),
    updateAvatar: (file: File) => dispatch(updateAvatarTC(file)),
    updateProfileInfo: (profileData: ProfileInfoType) => dispatch(updateProfileInfoTC(profileData)),
  }
}

const connector = connect<MapStateType, MapDispatchType, OwnPropsType>(mapStateToProps, mapDispatchToProps)

export default compose(connector, withRouter)(ProfileC)
