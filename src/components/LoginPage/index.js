import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

import {LoginButton} from './styledComponents'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showPassword, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div
              className={
                isDarkTheme
                  ? 'login-form-container-dark'
                  : 'login-form-container-light'
              }
            >
              <form
                onSubmit={this.onSubmitForm}
                className={
                  isDarkTheme ? 'form-container-dark' : 'form-container-light'
                }
              >
                <img
                  className="login-image"
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <div className="input-container">
                  <label className="input-label" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    onChange={this.onChangeUsername}
                    className="username-input-field"
                    type="text"
                    id="username"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    onChange={this.onChangePassword}
                    className="username-input-field"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                  />
                </div>
                <div className="show-password-container">
                  <input
                    onChange={this.onChangeShowPassword}
                    type="checkbox"
                    id="checkBox"
                  />
                  <label
                    className={
                      isDarkTheme
                        ? 'show-password-label-dark'
                        : 'show-password-label-light'
                    }
                    htmlFor="checkBox"
                  >
                    Show Password
                  </label>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginPage
