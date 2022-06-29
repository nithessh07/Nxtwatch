import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const HomeVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {channel, publishedAt, thumbnailUrl, id, title, views} = videoData
      const updatedData = {
        name: channel.name,
        profileImg: channel.profile_image_url,
      }

      return (
        <li className="video-card-container">
          <Link to={`/videos/${id}`} className="link-item">
            <img
              className="video-card-image"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <div className="video-card-profile-container">
              <img
                className="video-card-profile-image"
                src={updatedData.profileImg}
                alt="channel logo"
              />
              <div className="video-card-title-container">
                <p
                  className={
                    isDarkTheme
                      ? 'video-card-profile-title-dark'
                      : 'video-card-profile-title-light'
                  }
                >
                  {title}
                </p>
                <p
                  className={
                    isDarkTheme
                      ? 'video-card-profile-name-dark'
                      : 'video-card-profile-name-light'
                  }
                >
                  {updatedData.name}
                </p>
                <div className="video-card-views-container">
                  <p
                    className={
                      isDarkTheme
                        ? 'video-card-profile-name-dark'
                        : 'video-card-profile-name-light'
                    }
                  >
                    {views} •
                  </p>
                  <p
                    className={
                      isDarkTheme
                        ? 'video-card-profile-views-dark'
                        : 'video-card-profile-views-light'
                    }
                  >
                    {publishedAt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </ThemeContext.Consumer>
)

export default HomeVideoCard
