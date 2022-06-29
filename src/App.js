import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import ThemeContext from './context/ThemeContext'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import VideoItemView from './components/VideoItemView'
import TrendingSection from './components/TrendingSection'
import GamingSection from './components/GamingSection'
import SavedVideosSection from './components/SavedVideosSection'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingSection} />
          <ProtectedRoute exact path="/gaming" component={GamingSection} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosSection}
          />
          <ProtectedRoute exact path="/videos/:id" component={VideoItemView} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
