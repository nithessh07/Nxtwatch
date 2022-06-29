import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Slider from '../Slider'
import GamingVideoCard from '../GamingVideoCard'
import MobileSlider from '../MobileSlider'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingSection extends Component {
  state = {
    gamesList: [],
    apiStatus: apiStatusConstants.initial,
    sliderStatus: {
      homeActive: false,
      trendingActive: false,
      gamingActive: true,
      savedActive: false,
    },
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.videos.map(video => ({
        thumbnailUrl: video.thumbnail_url,
        id: video.id,
        title: video.title,
        views: video.view_count,
      }))
      this.setState({
        gamesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getGamingVideos()
  }

  renderLoadingView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <div
            className={
              isDarkTheme
                ? 'trending-loader-container-dark'
                : 'trending-loader-container-light'
            }
            data-testid="loader"
          >
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderFailureView = () => (
    <div className="home-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-view-image"
      />
      <h1 className="home-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="home-not-found-para">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        onClick={this.onClickRetryButton}
        type="button"
        className="home-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderGamingView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {gamesList} = this.state

        return (
          <div
            data-testid="gaming"
            className={
              isDarkTheme
                ? 'gaming-section-videos-container-dark'
                : 'gaming-section-videos-container-light'
            }
          >
            <div
              className={
                isDarkTheme
                  ? 'gaming-section-banner-dark'
                  : 'gaming-section-banner-light'
              }
            >
              <div
                className={
                  isDarkTheme
                    ? 'gaming-section-banner-icon-container-dark'
                    : 'gaming-section-banner-icon-container-light'
                }
              >
                <SiYoutubegaming />
              </div>
              <h1
                className={
                  isDarkTheme
                    ? 'gaming-section-banner-name-dark'
                    : 'gaming-section-banner-name-light'
                }
              >
                Gaming
              </h1>
            </div>
            <ul className="gaming-videos-container">
              {gamesList.map(video => (
                <GamingVideoCard videoData={video} key={video.id} />
              ))}
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderGamingDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {sliderStatus} = this.state
    return (
      <div className="video-item-container">
        <Header />
        <div className="video-item-bottom-container">
          <Slider sliderStatus={sliderStatus} />
          {this.renderGamingDetails()}
        </div>
        <MobileSlider sliderStatus={sliderStatus} />
      </div>
    )
  }
}

export default GamingSection
