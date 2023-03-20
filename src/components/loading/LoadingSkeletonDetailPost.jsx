import styled from 'styled-components'

const LoadingSkeletonDetailPostStyles = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .container {
    width: 80vw;
    margin: 0 auto;
    transition: width 0.1s;
    padding: 0px;
  }
  .post {
    &-header {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      gap: 40px;
      margin: 40px 0px;
    }
    &-image {
      border-radius: 16px;
      height: 466px;
      background-color: ${(props) => props.theme.skeleton};
      max-width: 640px;
      width: 100%;
    }
    &-info {
      flex: 1 1 0%;
      max-width: 640px;
      width: 100%;
    }
    &-category {
      width: 50px;
      background-color: ${(props) => props.theme.skeleton};
      margin-bottom: 8px;
      padding: 18px 50px;
      border-radius: 8px;
    }
    &-title {
      height: 300px;
      width: 200px;
      background-color: ${(props) => props.theme.skeleton};
      margin-bottom: 16px;
      border-radius: 8px;
    }
    &-meta {
      display: flex;
      gap: 12px;
    }
    &-time {
      padding: 12px 40px;
      background-color: ${(props) => props.theme.skeleton};
      border-radius: 8px;
    }
    &-author {
      padding: 12px 40px;
      background-color: ${(props) => props.theme.skeleton};
      border-radius: 8px;
    }
    &-content {
    }
  }
  .entry-content {
    width: 100%;
    height: 600px;
    background-color: ${(props) => props.theme.skeleton};
    border-radius: 16px;
  }

  @media (max-width: 1024px) {
    .post {
      &-header {
        display: flex;
        flex-direction: column;
      }
      &-title {
        width: 100%;
        height: 60px;
      }
    }
  }
`

const LoadingSkeletonDetailPost = () => {
  return (
    <LoadingSkeletonDetailPostStyles>
      <div className="container">
        <div className="post-header">
          <div className="post-image"></div>
          <div className="post-info">
            <div className="post-category"></div>
            <div className="post-title"></div>
            <div className="post-meta">
              <div className="post-time"></div>
              <div className="post-author"></div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <div className="entry-content"></div>
        </div>
      </div>
    </LoadingSkeletonDetailPostStyles>
  )
}

export default LoadingSkeletonDetailPost
