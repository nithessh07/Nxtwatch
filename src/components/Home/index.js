import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Slider from '../Slider'
import HomeVideoCard from '../HomeVideoCard'
import MobileSlider from '../MobileSlider'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

import {HomeContainer, BuyPremiumContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    bannerActive: true,
    apiStatus: apiStatusConstants.initial,
    sliderStatus: {
      homeActive: true,
      trendingActive: false,
      gamingActive: false,
      savedActive: false,
    },
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  onClickRetryButton = () => {
    this.setState({searchInput: ''})
    this.getHomeVideos()
  }

  renderVideosListView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const {videosList} = this.state
        const shouldShowVideosList = videosList.length > 0

        return shouldShowVideosList ? (
          <ul className="videos-list">
            {videosList.map(video => (
              <HomeVideoCard videoData={video} key={video.id} />
            ))}
          </ul>
        ) : (
          <div className="no-videos-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              className="no-videos-img"
              alt="no videos"
            />
            <h1
              className={
                isDarkTheme
                  ? 'no-videos-heading-dark'
                  : 'no-videos-heading-light'
              }
            >
              No Search Results Found
            </h1>
            <p
              className={
                isDarkTheme
                  ? 'no-videos-description-dark'
                  : 'no-videos-description-light'
              }
            >
              Try different key words or remove search filter.
            </p>
            <button
              onClick={this.onClickRetryButton}
              className="no-videos-button"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getHomeVideos()
  }

  renderSearchSection = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchInput} = this.state
        return (
          <div className="search-container">
            <input
              className={
                isDarkTheme ? 'search-input-dark' : 'search-input-light'
              }
              value={searchInput}
              onChange={this.onChangeSearchInput}
              type="search"
              placeholder="Search"
              id="videoSearch"
            />
            <button
              data-testid="searchButton"
              onClick={this.onClickSearchBtn}
              type="button"
              className={
                isDarkTheme
                  ? 'search-icon-container-dark'
                  : 'search-icon-container-light'
              }
            >
              <label className="search-icon" htmlFor="videoSearch">
                <BsSearch />
              </label>
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onClickCloseBtn = () => {
    this.setState({bannerActive: false})
  }

  renderBuyPremiumSection = () => {
    const {bannerActive} = this.state
    return (
      <BuyPremiumContainer display={bannerActive} data-testid="banner">
        <div>
          <img
            className="buy-premium-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p className="buy-premium-para">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button className="buy-premium-button" type="button">
            GET IT NOW
          </button>
        </div>
        <button
          type="button"
          data-testid="close"
          onClick={this.onClickCloseBtn}
          className="buy-premium-cross-btn"
        >
          <AiOutlineClose />
        </button>
      </BuyPremiumContainer>
    )
  }

  renderHomeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
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
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <HomeContainer theme={isDarkTheme} data-testid="home">
              <Header />
              <div className="home-bottom-container">
                <Slider sliderStatus={sliderStatus} />
                <div
                  className={
                    isDarkTheme ? 'home-content-dark' : 'home-content-light'
                  }
                >
                  {this.renderBuyPremiumSection()}
                  {this.renderSearchSection()}
                  {this.renderHomeDetails()}
                </div>
              </div>
              <MobileSlider sliderStatus={sliderStatus} />
            </HomeContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
