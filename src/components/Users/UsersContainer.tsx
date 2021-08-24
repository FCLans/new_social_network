import * as React from 'react'
import { connect } from 'react-redux'
import { followTC, getUsersTC, unfollowTC } from '../../redux/usersReducer'
import { Users } from './Users'
import { Loader } from '../common/Loader/Loader'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'
import { useEffect, useState } from 'react'
import { getIsFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/selectors/userSelector'
import { getIsLoadPage } from '../../redux/selectors/loaderSelector'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalItemsCount: number
  isLoadPage: boolean
  isFollowingProgress: Array<number>
}

type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (pageSize: number, currentPage: number) => void
}

// type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersC: React.FC<PropsType> = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    props.setUsers(props.pageSize, currentPage)
  }, [currentPage])

  const onClickPage = (numberPage: number) => {
    setCurrentPage(numberPage)
    props.setUsers(props.pageSize, numberPage)
  }

  return (
    <div>
      {props.isLoadPage ? <Loader /> : null}
      <Users {...props} currentPage={currentPage} onClickPage={onClickPage} />
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalUsersCount(state),
    isLoadPage: getIsLoadPage(state),
    isFollowingProgress: getIsFollowingProgress(state),
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, Action>) => {
  return {
    follow: (userId: number) => dispatch(followTC(userId)),
    unfollow: (userId: number) => dispatch(unfollowTC(userId)),
    setUsers: (pageSize: number, currentPage: number) => dispatch(getUsersTC(pageSize, currentPage)),
  }
}
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect<MapStatePropsType, MapDispatchPropsType, undefined, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersC)
