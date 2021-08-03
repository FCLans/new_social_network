const ADD_POST = 'PROFILE/ADD_POST'
const EDITE_NEW_POST_TEXT = 'PROFILE/EDITE_NEW_POST_TEXT'
const SET_PROFILE_INFO = 'PROFILE/SET_PROFILE_INFO'

const initialState = {
  profileInfo: null,
  postsData: [
    {id: 1, message: 'Привет, мой первый пост!', likesCount: 120},
    {id: 2, message: 'Разгоняемся и летим)))', likesCount: 20},
  ],
  newPostText: '',
}


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postsData[state.postsData.length - 1].id + 1,
        message: state.newPostText,
        likesCount: 0,
      }

      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: ''
      }

    case EDITE_NEW_POST_TEXT:
      return {
        ...state, newPostText: action.data
      }

    case SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: action.data
      }

    default:
      return state
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const editeNewPostTextActionCreator = (text) => ({type: EDITE_NEW_POST_TEXT, data: text})
export const setProfileInfoAC = (profile) => ({type: SET_PROFILE_INFO, data: profile})

export default profileReducer