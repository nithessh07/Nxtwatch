import {RiMoonCloudyFill} from 'react-icons/ri'
import {FiSun} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import LogoutButton from '../LogoutButton'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const onToggleTheme = () => {
        toggleTheme()
      }
      return (
        <nav className={isDarkTheme ? 'nav-header-dark' : 'nav-header-light'}>
          <div
            className={isDarkTheme ? 'nav-content-dark' : 'nav-content-light'}
          >
            <div>
              <Link to="/">
                <img
                  className="website-logo"
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
            </div>
            <ul className="nav-menu">
              <li>
                <button
                  data-testid="theme"
                  onClick={onToggleTheme}
                  className="theme-button"
                  type="button"
                >
                  {isDarkTheme ? (
                    <FiSun className="nav-dark-icon" />
                  ) : (
                    <RiMoonCloudyFill className="nav-light-icon" />
                  )}
                </button>
              </li>
              <li>
                <img
                  className="profile-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                  alt="profile"
                />
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default Header
