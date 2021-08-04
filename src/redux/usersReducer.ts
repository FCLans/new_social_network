const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT_USERS = 'USERS/SET_TOTAL_COUNT_USERS'

export type initialStateType = {
  users: any
  pageSize: number
  totalUsersCount: number
  currentPage: number
}
const initialState: initialStateType = {
  users: [],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
}

const usersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.data) {
            return {...u, followed: true}
          }

          return u
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user: any) => {
          if (user.id === action.data) {
            return {...user, followed: false}
          }

          return user
        })
      }

    case SET_USERS:
      return {
        ...state,
        users: [...action.data]
      }

    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.data}

    case SET_TOTAL_COUNT_USERS:
      return {...state, totalUsersCount: action.data}

    default:
      return state
  }
}

export const followAC = (userId: number): FollowACType => {
  return {type: FOLLOW, data: userId}
}

export const unfollowAC = (userId: number): unfollowACType => {
  return {type: UNFOLLOW, data: userId}
}

export const setUsersAC = (users: Object): setUsersACType => {
  return {type: SET_USERS, data: users}
}

export const setCurrentPageAC = (numberPage: number): setCurrentPageACType => {
  return {type: SET_CURRENT_PAGE, data: numberPage}
}

export const setTotalUsersCountAC = (count: number):setTotalUsersCountACType => {
  return {type: SET_TOTAL_COUNT_USERS, data: count}
}

type FollowACType = {
  type: typeof FOLLOW,
  data: number
}
type unfollowACType = {
  type: typeof UNFOLLOW
  data: number
}
type setUsersACType = {
  type: typeof SET_USERS
  data: Object
}
type setCurrentPageACType = {
  type: typeof SET_CURRENT_PAGE
  data: number
}
type setTotalUsersCountACType = {
  type: typeof SET_TOTAL_COUNT_USERS
  data: number
}

export default usersReducer