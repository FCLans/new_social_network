import { UserType } from '../types/types'
import { UsersApi } from '../api/api'
import { toggleIsLoadPageAC } from './loaderReducer'
import { UsersDataType } from '../types/apiTypes'
import { AppDispatch } from './reduxStore'
import { mapArrayHelper } from '../utils/objectHelper'

const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_TOTAL_COUNT_USERS = 'USERS/SET_TOTAL_COUNT_USERS'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFollowingProgress: [] as Array<number>,
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: mapArrayHelper(state.users, 'id', action.data, { followed: true }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: mapArrayHelper(state.users, 'id', action.data, { followed: false }),
      }

    case SET_USERS:
      return {
        ...state,
        users: [...action.data],
      }

    case SET_TOTAL_COUNT_USERS:
      return { ...state, totalUsersCount: action.data }

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        isFollowingProgress: action.isFetching
          ? [...state.isFollowingProgress, action.userId]
          : state.isFollowingProgress.filter((id) => id !== action.userId),
      }

    default:
      return state
  }
}

//Action Creators
const followAC = (userId: number): FollowACType => {
  return { type: FOLLOW, data: userId }
}

const unfollowAC = (userId: number): UnfollowACType => {
  return { type: UNFOLLOW, data: userId }
}

const setUsersAC = (users: Array<UserType>): SetUsersACType => {
  return { type: SET_USERS, data: users }
}

const setTotalUsersCountAC = (count: number): SetTotalUsersCountACType => {
  return { type: SET_TOTAL_COUNT_USERS, data: count }
}

const toggleFollowingInProgressAC = (isFetching: boolean, userId: number): toggleFollowingInProgressACType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId,
  }
}

//Action Types
type ActionsType = FollowACType | UnfollowACType | SetUsersACType | SetTotalUsersCountACType | toggleFollowingInProgressACType

type FollowACType = {
  type: typeof FOLLOW
  data: number
}
type UnfollowACType = {
  type: typeof UNFOLLOW
  data: number
}
type SetUsersACType = {
  type: typeof SET_USERS
  data: Array<UserType>
}
type SetTotalUsersCountACType = {
  type: typeof SET_TOTAL_COUNT_USERS
  data: number
}
type toggleFollowingInProgressACType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}

//Thunk Creators

export const getUsersTC = (pageSize: number, currentPage: number): any => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsLoadPageAC(true))

    const data: UsersDataType = await UsersApi.getUsers(pageSize, currentPage)

    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCountAC(data.totalCount))
    dispatch(toggleIsLoadPageAC(false))
  }
}

export const followTC = (userId: number): any => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleFollowingInProgressAC(true, userId))

    const data = await UsersApi.follow(userId)

    if (data.resultCode === 0) {
      dispatch(followAC(userId))
      dispatch(toggleFollowingInProgressAC(false, userId))
    }
  }
}

export const unfollowTC = (userId: number): any => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleFollowingInProgressAC(true, userId))

    const data = await UsersApi.unfollow(userId)

    if (data.resultCode === 0) {
      dispatch(unfollowAC(userId))
      dispatch(toggleFollowingInProgressAC(false, userId))
    } else if (!data.resultCode) {
      toggleFollowingInProgressAC(false, userId)
    }
  }
}

export default usersReducer
