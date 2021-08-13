import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
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

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
