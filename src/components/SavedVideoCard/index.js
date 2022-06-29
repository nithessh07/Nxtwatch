import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const SavedVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {
        channelName,
        publishedAt,
        id,
        thumbnailUrl,
        title,
        views,
      } = videoData

      return (
        <li className="saved-card-container">
          <Link to={`/videos/${id}`} className="trending-link-item">
            <img
              className="saved-card-image"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <div>
              <p
                className={
                  isDarkTheme
                    ? 'saved-card-title-dark'
                    : 'saved-card-title-light'
                }
              >
                {title}
              </p>
              <p className="saved-card-profile-name">{channelName}</p>
              <div className="saved-card-views-container">
                <p className="saved-card-profile-name">{views} </p>
                <p> •</p>
                <p className="saved-card-profile-name">{publishedAt}</p>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideoCard
