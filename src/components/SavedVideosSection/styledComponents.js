import styled from 'styled-components/macro'

export const SavedVideosContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  padding: 0px;
  background-color: ${props => (props.outline ? '#0f0f0f' : '#f9f9f9')};
`
