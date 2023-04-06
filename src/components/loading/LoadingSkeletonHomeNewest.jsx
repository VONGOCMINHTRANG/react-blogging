import { useDarkTheme } from 'contexts/theme-context'
import styled from 'styled-components'

const LoadingSkeletonHomeNewestStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    .slick-slide {
        padding: 0 10px;
    }
    .container{
        margin: 0 auto;
        transition: width .1s;
        width: 80vw;
        padding: 0;
    }
    .content{
        display: flex ;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
    }
    .view-all{
        margin-right: 0;
        font-size: 1em;
        color: white
        cursor: pointer;
        position: relative;
        height: 20px;
        background-color: rgb(58, 16, 151);
    }
    .heading{
      padding: 1.3rem;
      width: 150px;
      margin-bottom: 30px; 
      background-color: ${(props) => props.theme.skeleton};
    }
    .button{
      padding: 1rem;
      border-radius: 8px;
      width: 90px;
      background-color: ${(props) => props.theme.skeleton};
    }
    .post {
        &-image{
            height: min(520px, 100vh);
            background-color: ${(props) => props.theme.skeleton};
            border-radius: 16px;
            margin-bottom: 12px;
        }
        &-category{
            margin-bottom: 12px;
            width: 80px;
            height: 30px;
            background-color: ${(props) => props.theme.skeleton};
            display: inline-block;
            border-radius: 10px;
        }
        &-title{
          margin-bottom: 12px;
          width: 100%;
          height: 35px;
          background-color: ${(props) => props.theme.skeleton};
        }
        &-meta{
          margin-bottom: 12px;
          width: 200px;
          height: 20px;
          background-color: ${(props) => props.theme.skeleton};
        }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    .layout{
        display: grid;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
        gap: 40px;
        margin-bottom: 64px;
        -webkit-box-align: start;
        align-items: start;
    }
    .sidebar{
        padding: 28px 20px;
        background-color: ${(props) => props.theme.skeleton};;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        height: 650px;

    }
    @media (max-width: 1024px){
      .layout{
        grid-template-columns: repeat(1, minmax(0px, 1fr));
      }
    }
    @media (max-width: 767px){
      .layout{
        grid-template-columns: repeat(1, minmax(0px, 1fr));
      }
      .sidebar{
        flex-direction: row;
        height: 580px;
      }
    }
`

const LoadingSkeletonHomeNewest = () => {
  const { darkTheme } = useDarkTheme()

  return (
    <LoadingSkeletonHomeNewestStyles className={darkTheme ? 'bg-black/80' : ''}>
      <div className="container">
        <div className="content">
          <h2 className="heading"></h2>
          <div className="button"></div>
        </div>
        <div className="layout">
          <div className="post-newest-left">
            <div className="post-image"></div>
            <div className="post-category"></div>
            <div className="post-title"></div>
            <div className="post-meta"></div>
          </div>
          <div className="sidebar"></div>
        </div>
      </div>
    </LoadingSkeletonHomeNewestStyles>
  )
}

export default LoadingSkeletonHomeNewest
