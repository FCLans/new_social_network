import React from 'react'
import {connect} from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC
} from '../../redux/usersReducer';
import * as axios from "axios";
import Users from "./Users";
import Loader from "../common/Loader/Loader";
import {toggleIsLoadPageAC} from "../../redux/loaderReducer";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsLoadPage(true)

    fetch(`https://rickandmortyapi.com/api/character/?page=${this.props.currentPage}`)
      .then(response => response.json()).then(data => {
      this.props.setUsers(data.results)
      this.props.setTotalUsersCount(data.info.count)
      this.props.toggleIsLoadPage(false)
    })
  }

  onClickPage = (numberPage) => {
    this.props.setCurrentPage(numberPage)
    this.props.toggleIsLoadPage(true)

    fetch(`https://rickandmortyapi.com/api/character/?page=${numberPage}`)
      .then(response => response.json()).then(data => {
        this.props.setUsers(data.results)
        this.props.toggleIsLoadPage(false)
    })
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
        />

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoadPage: state.loader.isLoadPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (numberPage) => {
      dispatch(setCurrentPageAC(numberPage))
    },
    setTotalUsersCount: (usersCount) => {
      dispatch(setTotalUsersCountAC(usersCount))
    },
    toggleIsLoadPage: (isLoadPage) => {
      dispatch(toggleIsLoadPageAC(isLoadPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)