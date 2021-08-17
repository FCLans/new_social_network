import { AppStateType } from '../reduxStore'
import { createSelector } from 'reselect'

const getUserSelector = (state: AppStateType) => {
  return state.usersPage.users
}

export const getUsers = createSelector(getUserSelector, (users) => {
  return users.filter((u) => true)
})

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getIsFollowingProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingProgress
}
