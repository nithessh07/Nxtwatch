import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {BiLike} from 'react-icons/bi'
import {AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'
import {HiOutlineBell} from 'react-icons/hi'

import Header from '../Header'
import Slider from '../Slider'
import MobileSlider from '../MobileSlider'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemView extends Component {
  state = {
    videoData: [],
    apiStatus: apiStatusConstants.initial,
    subscribe: false,
    likeActive: false,
    dislikeActive: false,
    saveActive: false,
    sliderStatus: {
      homeActive: false,
      trendingActive: false,
      gamingActive: false,
      savedActive: false,
    },
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        channelName: fetchedData.video_details.channel.name,
        channelImage: fetchedData.video_details.channel.profile_image_url,
        channelSubscribers: fetchedData.video_details.channel.subscriber_count,
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        videoUrl: fetchedData.video_details.video_url,
        title: fetchedData.video_details.title,
        publishedAt: fetchedData.video_details.published_at,
        views: fetchedData.video_details.view_count,
      }
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getVideoData()
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

  getTodoListFromLocalStorage = () => {
    const stringifiedTodoList = localStorage.getItem('savedVideosList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList === null) {
      return []
    }
    return parsedTodoList
  }

  onClickSaveVideo = () => {
    const {videoData} = this.state
    this.setState({saveActive: true})
    const savedVideosList = this.getTodoListFromLocalStorage()
    const videoObject = savedVideosList.some(each => each.id === videoData.id)
    if (videoObject === false) {
      savedVideosList.push(videoData)
      localStorage.setItem('savedVideosList', JSON.stringify(savedVideosList))
    }
  }

  onClickSaved = () => {
    const {videoData} = this.state
    this.setState({saveActive: false})
    const savedVideosList = this.getTodoListFromLocalStorage()
    const savedVideos = savedVideosList.filter(each => each.id !== videoData.id)
    localStorage.setItem('savedVideosList', JSON.stringify(savedVideos))
  }

  onClickSubscribeBtn = () => {
    this.setState({subscribe: true})
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({
      likeActive: !prevState.likeActive,
      dislikeActive: false,
    }))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({
      dislikeActive: !prevState.dislikeActive,
      likeActive: false,
    }))
  }

  renderVideoView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {
          videoData,
          subscribe,
          likeActive,
          dislikeActive,
          saveActive,
        } = this.state
        const likeBtnActive = likeActive ? 'like-active' : ''
        const dislikeBtnActive = dislikeActive ? 'dislike-active' : ''
        const {
          channelName,
          channelImage,
          channelSubscribers,
          description,
          videoUrl,
          title,
          publishedAt,
          views,
        } = videoData

        return (
          <div
            data-testid="videoItemDetails"
            className={
              isDarkTheme
                ? 'video-item-player-container-dark'
                : 'video-item-player-container-light'
            }
          >
            <div className="video-player-container">
              <ReactPlayer className="react-player" url={videoUrl} controls />
              <p
                className={
                  isDarkTheme
                    ? 'video-player-title-dark'
                    : 'video-player-title-light'
                }
              >
                {title}
              </p>
              <div className="video-player-views-container">
                <div className="video-player-view-container">
                  <p className="video-player-views">{views} •</p>
                  <p className="video-player-views">{publishedAt}</p>
                </div>
                <div className="like-buttons-container">
                  <button
                    onClick={this.onClickLikeButton}
                    type="button"
                    className={
                      isDarkTheme
                        ? `like-button-dark ${likeBtnActive}`
                        : `like-button-light ${likeBtnActive}`
                    }
                  >
                    <BiLike /> <p className="like-button-text">Like</p>
                  </button>
                  <button
                    onClick={this.onClickDislikeButton}
                    type="button"
                    className={
                      isDarkTheme
                        ? `like-button-dark ${dislikeBtnActive}`
                        : `like-button-light ${dislikeBtnActive}`
                    }
                  >
                    <AiOutlineDislike />
                    <p className="like-button-text">Dislike</p>
                  </button>
                  {saveActive ? (
                    <button
                      onClick={this.onClickSaved}
                      type="button"
                      className={
                        isDarkTheme ? 'like-button-dark' : 'like-button-light'
                      }
                    >
                      <CgPlayListAdd />
                      <p className="like-button-text">Saved</p>
                    </button>
                  ) : (
                    <button
                      onClick={this.onClickSaveVideo}
                      type="button"
                      className={
                        isDarkTheme ? 'like-button-dark' : 'like-button-light'
                      }
                    >
                      <CgPlayListAdd />
                      <p className="like-button-text">Save</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="video-player-profile-container">
                <div className="video-player-profile">
                  <div className="video-player-profile-sub">
                    <img
                      className="video-player-profile-image"
                      src={channelImage}
                      alt="channel logo"
                    />
                    <div>
                      <p
                        className={
                          isDarkTheme
                            ? 'video-player-profile-name-dark'
                            : 'video-player-profile-name-light'
                        }
                      >
                        {channelName}
                      </p>
                      <p className="video-player-sub">
                        {channelSubscribers} Subscribers
                      </p>
                    </div>
                  </div>
                  {subscribe ? (
                    <div className="subscribe-container">
                      <button
                        onClick={this.onClickSubscribeBtn}
                        type="button"
                        className="subscribed-button"
                      >
                        Subscribed
                      </button>
                      <p className="bell-icon">
                        <HiOutlineBell />
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={this.onClickSubscribeBtn}
                        type="button"
                        className="subscribe-button"
                      >
                        Subscribe
                      </button>
                    </div>
                  )}
                </div>
                <p
                  className={
                    isDarkTheme
                      ? 'video-player-profile-des-dark'
                      : 'video-player-profile-des-light'
                  }
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoView()
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
          {this.renderVideoDetails()}
        </div>
        <MobileSlider sliderStatus={sliderStatus} />
      </div>
    )
  }
}

export default VideoItemView
