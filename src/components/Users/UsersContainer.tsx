import * as React from 'react'
import { connect } from 'react-redux'
import { followTC, getUsersTC, unfollowTC } from '../../redux/usersReducer'
import { Users } from './Users'
import { Loader } from '../common/Loader/Loader'
import { UserType } from '../../types/types'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { useEffect } from 'react'

type PropsType = {
  users: Array<UserType>
  currentPage: number
  pageSize: number
  totalUsersCount: number
  isLoadPage: boolean

  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (currentPage: number) => void
}

const UsersC = (props: PropsType) => {
  useEffect(() => {
    props.setUsers(props.currentPage)
  }, [])

  const onClickPage = (numberPage: number) => {
    props.setUsers(numberPage)
  }

  return (
    <div>
      {props.isLoadPage ? <Loader /> : null}
      <Users
        currentPage={props.currentPage}
        onClickPage={onClickPage}
        users={props.users}
        follow={props.follow}
        unfollow={props.unfollow}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
      />
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoadPage: state.loader.isLoadPage,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    follow: (userId: number) => {
      dispatch(followTC(userId))
    },
    unfollow: (userId: number) => {
      dispatch(unfollowTC(userId))
    },
    setUsers: (currentPage: number) => {
      dispatch(getUsersTC(currentPage))
    },
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)
