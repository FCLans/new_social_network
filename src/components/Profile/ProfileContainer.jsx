import React from "react";
import {connect} from "react-redux";
import {addPostActionCreator, editeNewPostTextActionCreator, setProfileInfoAC} from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {

  componentDidMount() {
    fetch('https://rickandmortyapi.com/api/character/2')
      .then(resp => resp.json())
      .then(r => {
        console.log(r)
        this.props.setProfileData(r)
      })
  }

  render() {
    return <Profile {...this.props}/>
  }
}

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profileInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editNewPostText: (text) => {
      dispatch(editeNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    },
    setProfileData: (data) => {
      console.log(data)
      dispatch(setProfileInfoAC(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
