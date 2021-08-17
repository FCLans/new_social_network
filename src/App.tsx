import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { Music } from './components/Music/Music'
import { Navbar } from './components/Navbar/Navbar'
import { Settings } from './components/Settings/Settings'
import { News } from './components/News/News'
import { Footer } from './components/Footer/Footer'
import { DialogsContainer } from './components/Dialogs/DialogsContainer'
import { UsersContainer } from './components/Users/UsersContainer'
import './App.css'
import { ProfileContainer } from './components/Profile/ProfileContainer'
import * as React from 'react'
import { Login } from './components/Login/Login'
import { HeaderContainer } from './components/Header/HeaderContainer'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializedSuccess } from './redux/appReducer'
import { AppDispatch, AppStateType } from './redux/reduxStore'
import { Loader } from './components/common/Loader/Loader'
import { compose } from 'redux'

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
            <Route path="/messages" component={DialogsContainer} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="/news" component={News} />
            <Route path="/users" component={UsersContainer} />
            <Route path="/profile/:userId?" component={ProfileContainer} />
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
