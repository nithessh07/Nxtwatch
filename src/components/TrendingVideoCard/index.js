import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const TrendingVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {channel, publishedAt, id, thumbnailUrl, title, views} = videoData
      const updatedData = {
        name: channel.name,
        profileImg: channel.profile_image_url,
      }

      return (
        <li className="trending-card-container">
          <Link to={`/videos/${id}`} className="trending-link-item">
            <img
              className="trending-card-image"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <div>
              <p
                className={
                  isDarkTheme
                    ? 'trending-card-title-dark'
                    : 'trending-card-title-light'
                }
              >
                {title}
              </p>
              <p className="trending-card-profile-name">{updatedData.name}</p>
              <div className="trending-card-views-container">
                <p className="trending-card-profile-name">{views} • </p>
                <p className="trending-card-profile-name">{publishedAt}</p>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </ThemeContext.Consumer>
)

export default TrendingVideoCard
