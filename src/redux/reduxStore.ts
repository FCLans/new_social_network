import {createStore, combineReducers} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from './usersReducer';
import loaderReducer from "./loaderReducer";

const RootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  loader: loaderReducer
})

type RootReducerType = typeof RootReducers
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(RootReducers)

export default store