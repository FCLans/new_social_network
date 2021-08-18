import { PostDataType, ProfileInfoType } from '../types/types'
import profileReducer, { addPostActionCreator, deletePostAC } from './profileReducer'

const initialState = {
  profileInfo: null as ProfileInfoType,
  postsData: [
    { id: 1, message: 'Привет, мой первый пост!', likesCount: 120 },
    { id: 2, message: 'Разгоняемся и летим)))', likesCount: 20 },
  ] as Array<PostDataType>,
  status: '',
}

it('Add post', () => {
  //1. test data
  const action = addPostActionCreator('Текст нового поста')
  //2. action
  const newState = profileReducer(initialState, action)
  //3. expection
  expect(newState.postsData.length).toBe(3)
})

it('New post text matches post text in state', () => {
  //1. test data
  const action = addPostActionCreator('Текст нового поста')
  //2. action
  const newState = profileReducer(initialState, action)
  //3. expection
  expect(newState.postsData[newState.postsData.length - 1].message).toBe('Текст нового поста')
})

it('Delete post', () => {
  //1. test data
  const action = deletePostAC(2)
  //2. action
  const newState = profileReducer(initialState, action)
  //3. expection
  expect(newState.postsData.length).toBe(1)
})
