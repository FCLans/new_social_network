import { UserType } from '../types/types'
import { ResultCodeEnum, UsersApi } from '../api/api'
import { toggleIsLoadPageAC, ToggleIsLoadPageACType } from './loaderReducer'

import { AppStateType } from './reduxStore'
import { mapArrayHelper } from '../utils/objectHelper'
import { ThunkAction } from 'redux-thunk'

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFollowingProgress: [] as Array<number>,
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: NewActionTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: mapArrayHelper(state.users, 'id', action.data, { followed: true }),
      }

    case 'UNFOLLOW':
      return {
        ...state,
        users: mapArrayHelper(state.users, 'id', action.data, { followed: false }),
      }

    case 'SET_USERS':
      return {
        ...state,
        users: [...action.data],
      }

    case 'SET_TOTAL_COUNT_USERS':
      return { ...state, totalUsersCount: action.data }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

//____________________________________________
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
type NewActionTypes = ReturnType<InferValueTypes<typeof actions>>

const actions = {
  followAC: (userId: number) => {
    return { type: 'FOLLOW', data: userId } as const
  },

  unfollowAC: (userId: number) => {
    return { type: 'UNFOLLOW', data: userId } as const
  },

  setUsersAC: (users: Array<UserType>) => {
    return { type: 'SET_USERS', data: users } as const
  },

  setTotalUsersCountAC: (count: number) => {
    return { type: 'SET_TOTAL_COUNT_USERS', data: count } as const
  },

  toggleFollowingInProgressAC: (isFetching: boolean, userId: number) => {
    return {
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching: isFetching,
      userId: userId,
    } as const
  },
}
//____________________________________________

//Action Types
type ActionsType = NewActionTypes | ToggleIsLoadPageACType

//Thunk Type
type ThunkCreatorType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//Thunk Creators

export const getUsersTC = (pageSize: number, currentPage: number): ThunkCreatorType => {
  return async (dispatch) => {
    dispatch(toggleIsLoadPageAC(true))

    const data = await UsersApi.getUsers(pageSize, currentPage)

    dispatch(actions.setUsersAC(data.items))
    dispatch(actions.setTotalUsersCountAC(data.totalCount))
    dispatch(toggleIsLoadPageAC(false))
  }
}

export const followTC = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingInProgressAC(true, userId))

    const data = await UsersApi.follow(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.followAC(userId))
      dispatch(actions.toggleFollowingInProgressAC(false, userId))
    }
  }
}

export const unfollowTC = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingInProgressAC(true, userId))

    const data = await UsersApi.unfollow(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.unfollowAC(userId))
      dispatch(actions.toggleFollowingInProgressAC(false, userId))
    } else if (!data.resultCode) {
      dispatch(actions.toggleFollowingInProgressAC(false, userId))
    }
  }
}

export default usersReducer
