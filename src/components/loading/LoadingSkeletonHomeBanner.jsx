import { useDarkTheme } from 'contexts/theme-context'
import styled from 'styled-components'

const LoadingSkeletonHomeBannerStyles = styled.div`
  position: relative;
  padding-bottom: 4em;
  padding: 0px 3em;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  .wrapper {
    padding-bottom: 4em;
  }
  .container-fluid {
    background-color: ${(props) => props.theme.skeleton};
    height: min(520px, 100vh);
    width: calc(10em + 70vw);
    padding: 0px 20px;
    position: relative;
    border-radius: 10px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

const LoadingSkeletonHomeBanner = () => {
  const { darkTheme } = useDarkTheme()

  return (
    <LoadingSkeletonHomeBannerStyles className={darkTheme ? 'bg-black/80' : ''}>
      <div className="wrapper">
        <div className="container-fluid"></div>
      </div>
    </LoadingSkeletonHomeBannerStyles>
  )
}

export default LoadingSkeletonHomeBanner
