import { Button } from 'components/button'
import { Overlay } from 'components/overlay'
import styled from 'styled-components'
import { AuthProvider } from 'contexts/auth-context'
import LoadingSkeletonHomeBanner from 'components/loading/LoadingSkeletonHomeBanner'
import { useEffect, useState } from 'react'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'

const HomeBannerStyles = styled.div`
  position: relative;
  padding-bottom: 4em;
  padding: 0px 3em;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  .wrapper {
    padding-bottom: 4em;
  }

  .container-fluid {
    background-image: url('/background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: min(520px, 100vh);
    width: calc(10em + 70vw);
    padding: 0px 20px;
    position: relative;
    border-radius: 10px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
  }
  .banner {
    display: flex;
    padding: 3em;
    align-items: center;
    -webkit-box-align: center;
    position: relative;
  }
  .banner-content {
    width: min(500px, 60vw);
    display: flex;
    flex-direction: column;
    color: white;
    margin-right: min(4em, 7vw);
  }
  h1 {
    font-size: 30px;
    margin-bottom: 0.6em;
  }
  p {
    font-size: 15px;
    line-height: 25px;
  }
  .button {
    color: ${(props) => props.theme.secondary};
    background-color: white;
    width: fit-content;
    margin-top: 40px;
    margin-left: 0px;
  }
  @media (max-width: 540px) {
    width: 100%;
    padding: 0;
    display: block;
    border-radius: 0;
    .container-fluid {
      width: 100%;
      border-radius: 0;
    }
    .banner {
      padding: 1em;
    }
  }
`

const HomeBanner = () => {
  const [loading, isLoading] = useState(false)
  const { darkTheme } = useDarkTheme()

  useEffect(() => {
    isLoading(true)
    setTimeout(() => {
      isLoading(false)
    }, 250)
  }, [])

  return (
    <AuthProvider>
      {loading && <LoadingSkeletonHomeBanner></LoadingSkeletonHomeBanner>}
      {!loading && (
        <HomeBannerStyles className={darkTheme ? 'bg-black/80' : ''}>
          <div className="wrapper">
            <div className="container-fluid">
              <Overlay className="overlay"></Overlay>
              <div className="banner">
                <div className="banner-content">
                  <h1>React blogging</h1>
                  <p>
                    Welcome to React Blogging. You can post your blogs, write your feeling and
                    sharing interesting things with other people. Click the button to explore
                    something new.
                  </p>
                  <a href={PATH.sign_up} className="inline-block">
                    <Button type="button" to={PATH.sign_up} className="button mt-">
                      Get Started
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </HomeBannerStyles>
      )}
    </AuthProvider>
  )
}
export default HomeBanner
