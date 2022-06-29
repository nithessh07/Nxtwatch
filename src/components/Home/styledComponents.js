import styled from 'styled-components/macro'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 91.2vh;
  background-color: ${props => (props.outline ? '#181818' : '#f9f9f9')};

  @media screen and (max-width: 576px) {
    height: 87vh;
  }
`

export const BuyPremiumContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  display: ${props => (props.display ? 'flex' : 'none')};
  align-items: flex-start;
  justify-content: space-between;
`
