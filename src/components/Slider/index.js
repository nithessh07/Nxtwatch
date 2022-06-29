import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

import {LinkItem} from './styledComponents'

const Slider = props => (
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

      const isDark = isDarkTheme ? 'dark' : 'light'

      const renderHomeSlider = () => (
        <div
          className={
            homeActive
              ? `slider-item-container-${isDark} slider-active-${isDark}`
              : `slider-item-container-${isDark}`
          }
        >
          <Link to="/" className="link-items">
            <AiFillHome
              className={
                homeActive
                  ? 'slider-item-icon-light slider-active-icon'
                  : `slider-item-icon-${isDark}`
              }
            />
            <LinkItem
              className={
                homeActive
                  ? `slider-item-head-${isDark} slider-item-active-head-${isDark}`
                  : `slider-item-head-${isDark}`
              }
            >
              Home
            </LinkItem>
          </Link>
        </div>
      )

      const renderTrendingSlider = () => (
        <div
          className={
            trendingActive
              ? `slider-item-container-${isDark} slider-active-${isDark}`
              : `slider-item-container-${isDark}`
          }
        >
          <Link to="/trending" className="link-items">
            <HiFire
              className={
                trendingActive
                  ? `slider-item-icon-light slider-active-icon`
                  : `slider-item-icon-${isDark}`
              }
            />
            <h1
              className={
                trendingActive
                  ? `slider-item-head-${isDark} slider-item-active-head-${isDark}`
                  : `slider-item-head-${isDark}`
              }
            >
              Trending
            </h1>
          </Link>
        </div>
      )

      const renderGamingSlider = () => (
        <div
          className={
            gamingActive
              ? `slider-item-container-${isDark} slider-active-${isDark}`
              : `slider-item-container-${isDark}`
          }
        >
          <Link to="/gaming" className="link-items">
            <SiYoutubegaming
              className={
                gamingActive
                  ? 'slider-item-icon-light slider-active-icon'
                  : `slider-item-icon-${isDark}`
              }
            />
            <h1
              className={
                gamingActive
                  ? `slider-item-head-${isDark} slider-item-active-head-${isDark}`
                  : `slider-item-head-${isDark}`
              }
            >
              Gaming
            </h1>
          </Link>
        </div>
      )

      const renderSavedSlider = () => (
        <div
          className={
            savedActive
              ? `slider-item-container-${isDark} slider-active-${isDark}`
              : `slider-item-container-${isDark}`
          }
        >
          <Link to="/saved-videos" className="link-items">
            <CgPlayListAdd
              className={
                savedActive
                  ? 'slider-item-icon-light slider-active-icon'
                  : `slider-item-icon-${isDark}`
              }
            />
            <h1
              className={
                savedActive
                  ? `slider-item-head-${isDark} slider-item-active-head-${isDark}`
                  : `slider-item-head-${isDark}`
              }
            >
              Saved Videos
            </h1>
          </Link>
        </div>
      )

      return (
        <div
          className={
            isDarkTheme ? 'slider-container-dark' : 'slider-container-light'
          }
        >
          <div className="sliders-container">
            {renderHomeSlider()}
            {renderTrendingSlider()}
            {renderGamingSlider()}
            {renderSavedSlider()}
          </div>
          <div>
            <p
              className={
                isDarkTheme ? 'contact-us-head-dark' : 'contact-us-head-light'
              }
            >
              CONTACT US
            </p>
            <div className="social-container">
              <img
                className="social-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                className="social-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                className="social-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p
              className={
                isDarkTheme ? 'contact-us-para-dark' : 'contact-us-para-light'
              }
            >
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Slider
