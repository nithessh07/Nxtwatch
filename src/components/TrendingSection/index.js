import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import Slider from '../Slider'
import TrendingVideoCard from '../TrendingVideoCard'
import MobileSlider from '../MobileSlider'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

import {TrendingVideosContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingSection extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    sliderStatus: {
      homeActive: false,
      trendingActive: true,
      gamingActive: false,
      savedActive: false,
    },
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
        channel: video.channel,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        id: video.id,
        title: video.title,
        views: video.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getTrendingVideos()
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

  renderTrendingView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {videosList} = this.state

        return (
          <TrendingVideosContainer theme={isDarkTheme} data-testid="trending">
            <div
              className={
                isDarkTheme
                  ? 'trending-section-banner-dark'
                  : 'trending-section-banner-light'
              }
            >
              <div
                className={
                  isDarkTheme
                    ? 'trending-section-banner-icon-container-dark'
                    : 'trending-section-banner-icon-container-light'
                }
              >
                <HiFire />
              </div>
              <p
                className={
                  isDarkTheme
                    ? 'trending-section-banner-name-dark'
                    : 'trending-section-banner-name-light'
                }
              >
                Trending
              </p>
            </div>
            <ul className="trending-videos-container">
              {videosList.map(video => (
                <TrendingVideoCard videoData={video} key={video.id} />
              ))}
            </ul>
          </TrendingVideosContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderTrendingDetails = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingView()
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
          {this.renderTrendingDetails()}
        </div>
        <MobileSlider sliderStatus={sliderStatus} />
      </div>
    )
  }
}

export default TrendingSection
