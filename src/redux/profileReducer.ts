import { PostDataType, ProfileInfoType } from '../types/types'
import { api } from '../api/api'
import { toggleIsLoadPageAC } from './loaderReducer'
import { AppDispatch } from './reduxStore'

const ADD_POST = 'PROFILE/ADD_POST'
const EDIT_NEW_POST_TEXT = 'PROFILE/EDIT_NEW_POST_TEXT'
const SET_PROFILE_INFO = 'PROFILE/SET_PROFILE_INFO'

const initialState = {
  profileInfo: null as ProfileInfoType,
  postsData: [
    { id: 1, message: 'Привет, мой первый пост!', likesCount: 120 },
    { id: 2, message: 'Разгоняемся и летим)))', likesCount: 20 },
  ] as Array<PostDataType>,
  newPostText: '',
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: state.postsData[state.postsData.length - 1].id + 1,
        message: action.text,
        likesCount: 0,
      }

      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: '',
      }
    }

    case EDIT_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.data,
      }

    case SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: action.data,
      }

    default:
      return state
  }
}

//Action Types
type ActionsType = AddPostActionCreatorType | EditNewPostTextActionCreatorType | SetProfileInfoAC

type AddPostActionCreatorType = {
  type: typeof ADD_POST
  text: string
}
type EditNewPostTextActionCreatorType = {
  type: typeof EDIT_NEW_POST_TEXT
  data: string
}
type SetProfileInfoAC = {
  type: typeof SET_PROFILE_INFO
  data: ProfileInfoType
}

export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({ type: ADD_POST, text: text })
export const editNewPostTextActionCreator = (text: string): EditNewPostTextActionCreatorType => ({ type: EDIT_NEW_POST_TEXT, data: text })
export const setProfileInfoAC = (profile: ProfileInfoType): SetProfileInfoAC => ({ type: SET_PROFILE_INFO, data: profile })

//Thunk Types
export const getProfileInfoTC = (userId: number): any => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsLoadPageAC(true))
    const data: ProfileInfoType = await api.getUserInfo(userId)

    dispatch(setProfileInfoAC(data))
    dispatch(toggleIsLoadPageAC(false))
  }
}

export default profileReducer
