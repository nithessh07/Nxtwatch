import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Slider from '../Slider'
import MobileSlider from '../MobileSlider'
import ThemeContext from '../../context/ThemeContext'

import SavedVideoCard from '../SavedVideoCard'

import './index.css'

import {SavedVideosContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideosSection extends Component {
  state = {
    savedVideosList: [],
    apiStatus: apiStatusConstants.success,
    sliderStatus: {
      homeActive: false,
      trendingActive: false,
      gamingActive: false,
      savedActive: true,
    },
  }

  componentDidMount() {
    const savedVideoList = this.getTodoListFromLocalStorage()
    this.setState({savedVideosList: savedVideoList})
  }

  getTodoListFromLocalStorage = () => {
    const stringifiedTodoList = localStorage.getItem('savedVideosList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList === null) {
      return []
    }
    return parsedTodoList
  }

  renderLoadingView = () => (
    <div className="trending-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSavedView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const {savedVideosList} = this.state
        const showSavedVideos = savedVideosList.length > 0

        return showSavedVideos ? (
          <SavedVideosContainer theme={isDarkTheme} data-testid="savedVideos">
            <div
              className={
                isDarkTheme
                  ? 'saved-section-banner-dark'
                  : 'saved-section-banner-light'
              }
            >
              <div
                className={
                  isDarkTheme
                    ? 'saved-section-banner-icon-container-dark'
                    : 'saved-section-banner-icon-container-light'
                }
              >
                <HiFire />
              </div>
              <h1
                className={
                  isDarkTheme
                    ? 'saved-section-banner-name-dark'
                    : 'saved-section-banner-name-light'
                }
              >
                Saved Videos
              </h1>
            </div>
            <ul className="saved-videos-container">
              {savedVideosList.map(video => (
                <SavedVideoCard videoData={video} key={video.id} />
              ))}
            </ul>
          </SavedVideosContainer>
        ) : (
          <div className="no-videos-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
              className="no-videos-img"
              alt="no saved videos"
            />
            <h1 className="no-videos-heading">No Saved Videos Found </h1>
            <p className="no-videos-description">
              You can save your videos while watching them
            </p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSavedVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSavedView()
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
          {this.renderSavedVideoDetails()}
        </div>
        <MobileSlider sliderStatus={sliderStatus} />
      </div>
    )
  }
}

export default SavedVideosSection
