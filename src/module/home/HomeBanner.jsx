import { Button } from 'components/button'
import { Overlay } from 'components/overlay'
import styled from 'styled-components'
import { AuthProvider, useAuth } from 'contexts/auth-context'
import LoadingSkeletonHomeBanner from 'components/loading/LoadingSkeletonHomeBanner'
import { useEffect, useState } from 'react'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'
import { useTranslation } from 'react-i18next'

const HomeBannerStyles = styled.div`
  position: relative;
  padding: 0 0 4em 0;

  .wrapper {
    display: flex;
    justify-content: center;
  }
  .container-fluid {
    background-image: url('/background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: min(520px, 100vh);
    max-width: calc(100vw);
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    justify-content: center;
  }
  .banner {
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    position: relative;
    width: 100%;
    max-width: 1280px;
  }
  .banner-content {
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }
  h1 {
    white-space: nowrap;
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
    display: block;
    border-radius: 0;
    .container-fluid {
      width: 100%;
      border-radius: 0;
    }
    .banner {
      padding: 0 2em;
    }
  }
  @media (min-width: 541px) and (max-width: 1309px) {
    .banner-content {
      padding: 0 2rem;
    }
  }
`

const HomeBanner = () => {
  const { t } = useTranslation()
  const { darkTheme } = useDarkTheme()
  const { userInfo } = useAuth()
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
        <HomeBannerStyles className={darkTheme ? 'bg-black/80' : ''}>
          <div className="wrapper">
            <div className="container-fluid">
              <Overlay className="overlay"></Overlay>
              <div className="banner">
                <div className="banner-content">
                  <h1>React blogging</h1>
                  <p>
                    {t(`Welcome to React Blogging. `)}
                    {t(
                      `You can post your blogs, write your feeling and sharing interesting things with other people. `
                    )}
                    {userInfo.length === 0 && t(` Click the button to explore something new.`)}
                  </p>

                  {userInfo.length === 0 && (
                    <a href={PATH.sign_up} className="inline-block">
                      <Button type="button" to={PATH.sign_up} className="button mt-">
                        {t(`Get Started`)}
                      </Button>
                    </a>
                  )}
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
