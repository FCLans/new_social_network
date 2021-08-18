import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import loaderReducer from './loaderReducer'
import { authReducer } from './authReducer'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'

const RootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  loader: loaderReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducers, composeEnhancers(applyMiddleware(ThunkMiddleware)))

type RootReducerType = typeof RootReducers
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

export default store
