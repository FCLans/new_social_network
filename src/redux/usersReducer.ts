import { UserType } from '../types/types'
import { UsersApi } from '../api/api'
import { toggleIsLoadPageAC } from './loaderReducer'
import { UsersDataType } from '../types/apiTypes'
import { AppDispatch } from './reduxStore'

const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
// const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT_USERS = 'USERS/SET_TOTAL_COUNT_USERS'

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: UserType) => {
          if (u.id === action.data) {
            return { ...u, followed: true }
          }

          return u
        }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user: UserType) => {
          if (user.id === action.data) {
            return { ...user, followed: false }
          }

          return user
        }),
      }

    case SET_USERS:
      return {
        ...state,
        users: [...action.data],
      }

    // case SET_CURRENT_PAGE:
    //   return { ...state, currentPage: action.data }

    case SET_TOTAL_COUNT_USERS:
      return { ...state, totalUsersCount: action.data }

    default:
      return state
  }
}

//Action Creators
export const followAC = (userId: number): FollowACType => {
  return { type: FOLLOW, data: userId }
}

export const unfollowAC = (userId: number): UnfollowACType => {
  return { type: UNFOLLOW, data: userId }
}

export const setUsersAC = (users: Array<UserType>): SetUsersACType => {
  return { type: SET_USERS, data: users }
}

// export const setCurrentPageAC = (numberPage: number): SetCurrentPageACType => {
//   return { type: SET_CURRENT_PAGE, data: numberPage }
// }

export const setTotalUsersCountAC = (count: number): SetTotalUsersCountACType => {
  return { type: SET_TOTAL_COUNT_USERS, data: count }
}

type ActionsType = FollowACType | UnfollowACType | SetUsersACType | SetTotalUsersCountACType

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
// type SetCurrentPageACType = {
//   type: typeof SET_CURRENT_PAGE
//   data: number
// }
type SetTotalUsersCountACType = {
  type: typeof SET_TOTAL_COUNT_USERS
  data: number
}

//Thunk Creators

export const getUsersTC = (pageSize: number, currentPage: number): any => {
  return (dispatch: AppDispatch) => {
    dispatch(toggleIsLoadPageAC(true))

    UsersApi.getUsers(pageSize, currentPage)
      .then((response) => response.json())
      .then((resp: any) => {
        dispatch(setUsersAC(resp.items))
        dispatch(setTotalUsersCountAC(resp.totalCount))
        dispatch(toggleIsLoadPageAC(false))
      })
  }
}

export const followTC = (userId: number): any => {
  return (dispatch: AppDispatch) => {
    //тут должны быть запросы на сервак и диспатч данных
    dispatch(followAC(userId))
  }
}

export const unfollowTC = (userId: number): any => {
  return (dispatch: AppDispatch) => {
    //тут должны быть запросы на сервак и диспатч данных
    dispatch(unfollowAC(userId))
  }
}

export default usersReducer
