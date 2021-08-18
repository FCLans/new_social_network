import { PostDataType, ProfileInfoType } from '../types/types'
import { ProfileApi } from '../api/api'
import { toggleIsLoadPageAC } from './loaderReducer'
import { AppDispatch } from './reduxStore'
import { filterArrayHelper } from '../utils/objectHelper'

const ADD_POST = 'PROFILE/ADD_POST'
const SET_PROFILE_INFO = 'PROFILE/SET_PROFILE_INFO'
const SET_PROFILE_STATUS = 'PROFILE/SET_PROFILE_STATUS'
const DELETE_POST = 'PROFILE/DELETE_POST'

const initialState = {
  profileInfo: null as ProfileInfoType,
  postsData: [
    { id: 1, message: 'Привет, мой первый пост!', likesCount: 120 },
    { id: 2, message: 'Разгоняемся и летим)))', likesCount: 20 },
  ] as Array<PostDataType>,
  status: '',
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: state.postsData.length + 1,
        message: action.text,
        likesCount: 0,
      }

      return {
        ...state,
        postsData: [...state.postsData, newPost],
      }
    }

    case SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: action.data,
      }

    case SET_PROFILE_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case DELETE_POST:
      return {
        ...state,
        postsData: filterArrayHelper(state.postsData, 'id', action.postId),
      }

    default:
      return state
  }
}

//Action Types
type ActionsType = AddPostActionCreatorType | SetProfileInfoACType | SetProfileStatusACType | DeletePostACType

type AddPostActionCreatorType = {
  type: typeof ADD_POST
  text: string
}
type SetProfileInfoACType = {
  type: typeof SET_PROFILE_INFO
  data: ProfileInfoType
}
type SetProfileStatusACType = {
  type: typeof SET_PROFILE_STATUS
  status: string
}
type DeletePostACType = {
  type: typeof DELETE_POST
  postId: number
}

//Action Creators
export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({ type: ADD_POST, text: text })
export const deletePostAC = (postId: number): DeletePostACType => ({ type: DELETE_POST, postId })
const setProfileInfoAC = (profile: ProfileInfoType): SetProfileInfoACType => ({ type: SET_PROFILE_INFO, data: profile })
const setProfileStatusAC = (status: string): SetProfileStatusACType => ({ type: SET_PROFILE_STATUS, status: status })

//Thunk Types
export const getProfileInfoTC = (userId: number): any => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsLoadPageAC(true))

    const data = await ProfileApi.getProfile(userId)

    dispatch(setProfileInfoAC(data))
    dispatch(toggleIsLoadPageAC(false))
  }
}

export const getProfileStatusTC = (userId: number): any => {
  return async (dispatch: AppDispatch) => {
    const data = await ProfileApi.getProfileStatus(userId)

    dispatch(setProfileStatusAC(data))
  }
}

export const updateProfileStatusTC = (status: string): any => {
  return async (dispatch: AppDispatch) => {
    const data = await ProfileApi.updateProfileStatus(status)

    if (data.resultCode === 0) {
      dispatch(setProfileStatusAC(status))
    }
  }
}

export default profileReducer
