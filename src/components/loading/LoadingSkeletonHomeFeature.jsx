import { useDarkTheme } from 'contexts/theme-context'
import styled from 'styled-components'

const LoadingSkeletonHomeFeatureStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding-bottom: 4em;
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
    .grid-layout{
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    .post-item{
      height: 270px;
      width: 100%;
      background-color: ${(props) => props.theme.skeleton};;
      border-radius: 16px;
      margin: 0 10px;

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

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    
    @media (max-width: 539px){
      .grid-layout{
        grid-template-columns: repeat(1, minmax(0, 1fr));
        width: 100%;
      }
      .post-item:last-child, .post-item:nth-child(2){
        display: none;
      }
    
    }
    @media (min-width: 540px) and (max-width: 949px){
      .grid-layout{
        grid-template-columns: repeat(2, minmax(0, 1fr));
        width: 100%
      }
      .post-item:last-child{
        display: none;
      }
    }

`

const LoadingSkeletonHomeFeature = () => {
  const { darkTheme } = useDarkTheme()

  return (
    <LoadingSkeletonHomeFeatureStyles className={darkTheme ? 'bg-black/80' : ''}>
      <div className="container">
        <div className="content">
          <h2 className="heading"></h2>
          <div className="button"></div>
        </div>
        <div className="grid-layout">
          <div className="post-item"></div>
          <div className="post-item"></div>
          <div className="post-item"></div>
        </div>
      </div>
    </LoadingSkeletonHomeFeatureStyles>
  )
}

export default LoadingSkeletonHomeFeature
