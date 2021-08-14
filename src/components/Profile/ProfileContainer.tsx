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
import { ProfileApi } from '../../api/api'
import { ErrorPage } from '../Error/Error'

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

const initStateProfile = {
  fullName: '',
  photos: {},
  lookingForAJobDescription: '',
  error: null as boolean,
}

const ProfileC = (props: PropsType) => {
  const [newPostText, editNewPostText] = useState('')
  const [localState, setLocalState] = useState(initStateProfile)

  useEffect(() => {
    let userId: number = +props.match.params.userId
    if (!userId) {
      userId = props.myId
    }
    const getProfileData = async (userId: number) => {
      try {
        const data = await ProfileApi.getProfile(userId)
        setLocalState(data)
      } catch (e) {
        setLocalState({
          ...localState,
          error: true,
        })
      }
    }
    // props.getProfileData(userId)
    getProfileData(userId)
    props.getProfileStatus(userId)
  }, [])

  return (
    <div>
      {!localState.error && <Profile {...props} profile={localState} newPostText={newPostText} editNewPostText={editNewPostText} />}
      {localState.error && <ErrorPage />}
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    // profile: state.profilePage.profileInfo,
    status: state.profilePage.status,
    myId: state.auth.data.id,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addPost: (text: string) => {
      dispatch(addPostActionCreator(text))
    },
    // getProfileData: (userId: number) => dispatch(getProfileInfoTC(userId)),
    getProfileStatus: (userId: number) => dispatch(getProfileStatusTC(userId)),
    updateProfileStatus: (status: string) => dispatch(updateProfileStatusTC(status)),
  }
}

export const ProfileContainer = compose(connect(mapStateToProps, mapDispatchToProps), withRedirect, withRouter)(ProfileC)
