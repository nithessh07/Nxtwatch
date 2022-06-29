import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const GamingVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {thumbnailUrl, title, views, id} = videoData

      return (
        <li className="gaming-card-container">
          <Link to={`/videos/${id}`} className="link-item">
            <img
              className="gaming-card-image"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <p
              className={
                isDarkTheme
                  ? 'gaming-card-title-dark'
                  : 'gaming-card-title-light'
              }
            >
              {title}
            </p>
            <p className="gaming-card-views">{views} Watching Worldwide</p>
          </Link>
        </li>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoCard
