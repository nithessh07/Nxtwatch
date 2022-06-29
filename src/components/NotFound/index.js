import Header from '../Header'
import Slider from '../Slider'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const sliderStatus = {
        homeActive: true,
        trendingActive: false,
        gamingActive: false,
        savedActive: false,
      }
      return (
        <div className="not-found-section">
          <Header />
          <div className="not-found-section-slider">
            <Slider sliderStatus={sliderStatus} />
            <div
              className={
                isDarkTheme
                  ? 'not-found-container-dark'
                  : 'not-found-container-light'
              }
            >
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="not-found-img"
              />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
