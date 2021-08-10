import { createStore, combineReducers, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import loaderReducer from './loaderReducer'

const RootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  loader: loaderReducer,
})

const store = createStore(RootReducers, applyMiddleware(ThunkMiddleware))

type RootReducerType = typeof RootReducers
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

export default store
