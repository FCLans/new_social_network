import * as React from 'react'
import {connect} from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC
} from '../../redux/usersReducer';
import Users from "./Users";
import Loader from "../common/Loader/Loader";
import {toggleIsLoadPageAC} from "../../redux/loaderReducer";
import {api} from "../../api/api";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type PropsType = {
  users: Array<UserType>
  currentPage: number
  pageSize: number
  totalUsersCount: number
  isLoadPage: boolean

  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (data: Array<UserType>) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (usersCount: number) => void
  toggleIsLoadPage: (isLoad: boolean) => void
}

class UsersContainer extends React.Component<PropsType> {

  async componentDidMount() {
    this.props.toggleIsLoadPage(true)

    const data = await api.getUsers(this.props.currentPage)

    this.props.setUsers(data.results)
    this.props.setTotalUsersCount(data.info.count)
    this.props.toggleIsLoadPage(false)

  }

  onClickPage = async (numberPage: number) => {
    this.props.setCurrentPage(numberPage)
    this.props.toggleIsLoadPage(true)

    const data = await api.getUsers(numberPage)
    this.props.setUsers(data.results)
    this.props.toggleIsLoadPage(false)
  }

  render() {
    return (
      <div>
        {this.props.isLoadPage ? <Loader/> : null}
        <Users currentPage={this.props.currentPage}
               onClickPage={this.onClickPage}
               users={this.props.users}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               pageSize={this.props.pageSize}
               totalUsersCount={this.props.totalUsersCount}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoadPage: state.loader.isLoadPage
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (numberPage: number) => {
      dispatch(setCurrentPageAC(numberPage))
    },
    setTotalUsersCount: (usersCount: number) => {
      dispatch(setTotalUsersCountAC(usersCount))
    },
    toggleIsLoadPage: (isLoadPage: boolean) => {
      dispatch(toggleIsLoadPageAC(isLoadPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)