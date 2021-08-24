import { PostDataType, ProfileInfoType } from '../types/types'
import { ProfileApi } from '../api/api'
import { toggleIsLoadPageAC, ToggleIsLoadPageACType } from './loaderReducer'
import { AppDispatch, AppStateType } from './reduxStore'
import { filterArrayHelper } from '../utils/objectHelper'
import { ThunkAction } from 'redux-thunk'

const ADD_POST = 'PROFILE/ADD_POST'
const SET_PROFILE_INFO = 'PROFILE/SET_PROFILE_INFO'
const SET_PROFILE_STATUS = 'PROFILE/SET_PROFILE_STATUS'
const DELETE_POST = 'PROFILE/DELETE_POST'
const UPDATE_AVATAR = 'PROFILE/UPDATE_AVATAR'

const initialState = {
  profileInfo: {} as ProfileInfoType,
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

    case UPDATE_AVATAR:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, photos: action.photos },
      }

    default:
      return state
  }
}

//Action Types
type ActionsType =
  | AddPostActionCreatorType
  | SetProfileInfoACType
  | SetProfileStatusACType
  | DeletePostACType
  | UpdateAvatarACType
  | ToggleIsLoadPageACType

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
type UpdateAvatarACType = {
  type: typeof UPDATE_AVATAR
  photos: PhotosType
}

//Action Creators
export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({ type: ADD_POST, text: text })
export const deletePostAC = (postId: number): DeletePostACType => ({ type: DELETE_POST, postId })
const setProfileInfoAC = (profile: ProfileInfoType): SetProfileInfoACType => ({ type: SET_PROFILE_INFO, data: profile })
const setProfileStatusAC = (status: string): SetProfileStatusACType => ({ type: SET_PROFILE_STATUS, status: status })

type PhotosType = {
  small: string
  large: string
}
const updateAvatarAC = (photos: PhotosType): UpdateAvatarACType => ({ type: UPDATE_AVATAR, photos: photos })

//Thunk Type
type ThunkCreatorsType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//Thunk Creators
export const getProfileInfoTC = (userId: number): ThunkCreatorsType => {
  return async (dispatch) => {
    dispatch(toggleIsLoadPageAC(true))

    const data = await ProfileApi.getProfile(userId)
    dispatch(setProfileInfoAC(data))
    dispatch(toggleIsLoadPageAC(false))
  }
}

export const getProfileStatusTC = (userId: number): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await ProfileApi.getProfileStatus(userId)

    dispatch(setProfileStatusAC(data))
  }
}

export const updateProfileStatusTC = (status: string): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await ProfileApi.updateProfileStatus(status)

    if (data.resultCode === 0) {
      dispatch(setProfileStatusAC(status))
    }
  }
}

export const updateAvatarTC = (file: File): ThunkCreatorsType => {
  return async (dispatch) => {
    const data = await ProfileApi.updateAvatar(file)

    if (data.resultCode === 0) {
      dispatch(updateAvatarAC(data.data.photos))
    }
  }
}

export const updateProfileInfoTC =
  (profileData: ProfileInfoType): ThunkCreatorsType =>
  async (dispatch) => {
    const data = await ProfileApi.updateProfileInfo(profileData)

    if (data.resultCode === 0) {
      dispatch(setProfileInfoAC(profileData))
    }
  }

export default profileReducer
