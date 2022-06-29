import {Link} from 'react-router-dom'

import {AiFillHome, AiOutlineHome} from 'react-icons/ai'
import {HiFire, HiOutlineFire} from 'react-icons/hi'
import {SiYoutube} from 'react-icons/si'
import {BsCollectionPlay, BsCollectionPlayFill} from 'react-icons/bs'
import {RiGamepadLine, RiGamepadFill} from 'react-icons/ri'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const MobileSlider = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {sliderStatus} = props
      const {
        homeActive,
        trendingActive,
        gamingActive,
        savedActive,
      } = sliderStatus

      return (
        <div
          className={
            isDarkTheme
              ? 'mobile-slider-container-dark'
              : 'mobile-slider-container-light'
          }
        >
          <nav className="nav-content">
            <Link to="/" className="link-item">
              <div className="mobile-slider-icons-container">
                {homeActive ? (
                  <AiFillHome
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                ) : (
                  <AiOutlineHome
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                )}
                <p
                  className={
                    isDarkTheme
                      ? 'mobile-slider-icon-name-dark'
                      : 'mobile-slider-icon-name-light'
                  }
                >
                  Home
                </p>
              </div>
            </Link>
            <Link to="/trending" className="link-item">
              <div className="mobile-slider-icons-container">
                {trendingActive ? (
                  <HiFire
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                ) : (
                  <HiOutlineFire
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                )}
                <p
                  className={
                    isDarkTheme
                      ? 'mobile-slider-icon-name-dark'
                      : 'mobile-slider-icon-name-light'
                  }
                >
                  Trending
                </p>
              </div>
            </Link>
            <SiYoutube className="mobile-slider-add-icons" />
            <Link to="/gaming" className="link-item">
              <div className="mobile-slider-icons-container">
                {gamingActive ? (
                  <RiGamepadFill
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                ) : (
                  <RiGamepadLine
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                )}
                <p
                  className={
                    isDarkTheme
                      ? 'mobile-slider-icon-name-dark'
                      : 'mobile-slider-icon-name-light'
                  }
                >
                  Gaming
                </p>
              </div>
            </Link>
            <Link to="/saved-videos" className="link-item">
              <div className="mobile-slider-icons-container">
                {savedActive ? (
                  <BsCollectionPlayFill
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                ) : (
                  <BsCollectionPlay
                    className={
                      isDarkTheme
                        ? 'mobile-slider-icons-dark'
                        : 'mobile-slider-icons-light'
                    }
                  />
                )}
                <p
                  className={
                    isDarkTheme
                      ? 'mobile-slider-icon-name-dark'
                      : 'mobile-slider-icon-name-light'
                  }
                >
                  Library
                </p>
              </div>
            </Link>
          </nav>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default MobileSlider
