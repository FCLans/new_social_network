import * as React from "react";
import {connect} from "react-redux";
import {addPostActionCreator, editeNewPostTextActionCreator, setProfileInfoAC} from "../../redux/profileReducer";
import Profile from "./Profile";
import {ApiSocialNetwork} from "../../api/api";
import {AppStateType} from "../../redux/reduxStore";
import {PostDataType, ProfileInfoType} from "../../types/types";

type PropsType = {
  newPostText: string
  postsData: Array<PostDataType>
  profile: ProfileInfoType

  editNewPostText: (text: string) => void
  setProfileData: (data: ProfileInfoType) => void
  addPost: () => void
}

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    const api: any = new ApiSocialNetwork()

    api.getUserInfo(2)
      .then((data: ProfileInfoType) => {
        this.props.setProfileData(data)
      })
  }

  render() {
    return <Profile {...this.props}/>
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profileInfo,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    editNewPostText: (text: string) => {
      dispatch(editeNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    },
    setProfileData: (data: ProfileInfoType) => {
      dispatch(setProfileInfoAC(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
