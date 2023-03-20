import { Button } from 'components/button'
import { Overlay } from 'components/overlay'
import styled from 'styled-components'
import { AuthProvider } from 'contexts/auth-context'
import LoadingSkeletonHomeBanner from 'components/loading/LoadingSkeletonHomeBanner'
import { useEffect, useState } from 'react'

const HomeBannerStyles = styled.div`
  position: relative;
  margin-bottom: 4em;
  padding: 0px 3em;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;

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
    z-index: 10;
  }
  .banner-content {
    width: min(500px, 60vw);
    display: flex;
    flex-direction: column;
    color: white;
    margin-right: min(4em, 7vw);
  }
  h1 {
    font-size: calc(1.5em + 1.2vw);
    margin-bottom: 0.6em;
  }
  p {
    font-size: min(0.9em, 3vw);
    line-height: min(28px, 4vw);
  }
  .button {
    color: ${(props) => props.theme.secondary};
    background-color: white;
    width: fit-content;
    margin-top: 40px;
    margin-left: 0px;
  }
  @media (max-width: 540px) {
    .container-fluid {
      padding: 0px 10px;
    }
  }
`

const HomeBanner = () => {
  const [loading, isLoading] = useState(false)
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
        <HomeBannerStyles>
          <div className="container-fluid">
            <Overlay className="overlay"></Overlay>
            <div className="banner">
              <div className="banner-content">
                <h1>React blogging</h1>
                <p>
                  Welcome to React Blogging. You can post your blogs, write your feeling and sharing
                  interesting things with other people. Click the button to explore something new.
                </p>
                <a href="/sign-up" className="inline-block">
                  <Button type="button" to="/sign-up" className="button mt-">
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </HomeBannerStyles>
      )}
    </AuthProvider>
  )
}
export default HomeBanner
