import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { Music } from './components/Music/Music'
import { Navbar } from './components/Navbar/Navbar'
import { Settings } from './components/Settings/Settings'
import { News } from './components/News/News'
import { Footer } from './components/Footer/Footer'
import * as React from 'react'
import { Login } from './components/Login/Login'
import { HeaderContainer } from './components/Header/HeaderContainer'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializedSuccess } from './redux/appReducer'
import { AppDispatch, AppStateType } from './redux/reduxStore'
import { Loader } from './components/common/Loader/Loader'
import { compose } from 'redux'
import './App.css'
import { withSuspense } from './components/hoc/withSuspense'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

const App = (props: any) => {
  useEffect(() => {
    props.initializedSuccess()
  }, [props.initialized])

  if (!props.initialized) {
    return <Loader />
  }

  return (
    <div className="body">
      <div className="app_wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app_wrapper_content">
          <Switch>
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="/news" component={News} />
            <Route path="/messages" component={withSuspense(DialogsContainer)} />
            <Route path="/users" component={withSuspense(UsersContainer)} />
            <Route path="/profile/:userId?" component={withSuspense(ProfileContainer)} />
            <Route path="/login" component={Login} />
            <Redirect to="/profile" />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initializedSuccess: () => dispatch(initializedSuccess()),
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)
