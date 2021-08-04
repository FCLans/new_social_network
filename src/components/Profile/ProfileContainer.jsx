import React from "react";
import {connect} from "react-redux";
import {addPostActionCreator, editeNewPostTextActionCreator, setProfileInfoAC} from "../../redux/profileReducer";
import Profile from "./Profile";
import {ApiSocialNetwork} from "../../api/api";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.api = new ApiSocialNetwork()
  }

  componentDidMount() {
    this.api.getUserInfo(2)
      .then(data => {
        this.props.setProfileData(data)
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
      dispatch(setProfileInfoAC(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
