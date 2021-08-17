import { AppStateType } from '../reduxStore'

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getIsFollowingProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingProgress
}
