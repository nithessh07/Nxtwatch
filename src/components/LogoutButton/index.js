import Popup from 'reactjs-popup'
import {MdExitToApp} from 'react-icons/md'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const LogoutButton = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const onClickConfirm = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div>
          <Popup
            modal
            trigger={
              <div>
                <button
                  type="button"
                  className={
                    isDarkTheme
                      ? 'logout-desktop-btn-dark'
                      : 'logout-desktop-btn-light'
                  }
                >
                  Logout
                </button>
                <button
                  type="button"
                  className={
                    isDarkTheme
                      ? 'logout-mobile-btn-dark'
                      : 'logout-mobile-btn-light'
                  }
                >
                  <MdExitToApp />
                </button>
              </div>
            }
            className="popup-content"
          >
            {close => (
              <div
                className={
                  isDarkTheme ? 'modal-container-dark' : 'modal-container-light'
                }
              >
                <p
                  className={
                    isDarkTheme
                      ? 'popup-description-dark'
                      : 'popup-description-light'
                  }
                >
                  Are you sure, you want to logout
                </p>
                <div className="popup-button-container">
                  <button
                    className="close-button"
                    type="button"
                    testid="closeButton"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onClickConfirm}
                    type="button"
                    className="confirm-button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(LogoutButton)
