import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardMenu from './DashboardMenu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { IconArrowDown, IconHome, IconNotification } from 'components/icon'
import { Suspense, useEffect, useState } from 'react'
import { Blur } from 'components/blur'
import { IconMenu } from 'components/icon'
import { useDarkTheme } from 'contexts/theme-context'
import MenuUser from 'components/menu/MenuUser'
import useClickOutside from 'hooks/useClickOutside'

const DashboardLayoutStyles = styled.div`
  display: flex;
  width: 100%;

  .dashboard-main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .dashboard-children {
    background-color: #f0f0f0;
    min-height: 100vh;
    height: auto;
    padding: 10px;
    width: auto;
  }
  .sidebarBtn {
    display: flex;
    flex: 1;
    margin-right: 1em;
    font-size: 2em;
    cursor: pointer;
  }
  .icon-home {
    position: fixed;
    bottom: 1em;
    right: 1em;
    padding: 1em;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 100%;
    cursor: pointer;
    z-index: 100;
    color: white;
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    padding: 10px;
    background-color: white;
  }
  .header-avatar {
    width: 40px;
    height: 40px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
      background-position: center center;
    }
  }
  .header-email {
    display: flex;
    gap: 5px;
    cursor: pointer;
  }
  .logout {
    padding: 0 10px;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 949px) {
    .dashboard-children {
      padding: 20px;
    }
    .dashboard-main {
      width: 100%;
    }
  }

  @media (max-width: 540px) {
    .user-email {
      display: none;
    }
    .menu-user {
      top: 30px;
    }
  }
`

const DashboardLayout = () => {
  const { userInfo } = useAuth()
  const { darkTheme } = useDarkTheme()
  const { show, nodeRef } = useClickOutside()
  const [open, setOpen] = useState(false)
  const [checkUser, setCheckUser] = useState(true)

  useEffect(() => {
    try {
      if (userInfo.length === 0) {
        setCheckUser(false)
      }
      if (userInfo.email) {
        setCheckUser(true)
      }
    } catch (error) {
      console.log(error)
    }
  }, [userInfo])

  return (
    <>
      {!checkUser && <NotFoundPage></NotFoundPage>}

      {checkUser && (
        <DashboardLayoutStyles>
          {open && (
            <>
              <Blur onClick={() => setOpen(false)}></Blur>
            </>
          )}

          <DashboardMenu open={open} setOpen={setOpen}></DashboardMenu>
          <div className="dashboard-main">
            <div className={`header-right drop-shadow-lg ${darkTheme ? '!bg-black/80' : ''}`}>
              <button className="sidebarBtn" onClick={() => setOpen(true)}>
                <IconMenu></IconMenu>
              </button>

              <div className="notification relative cursor-pointer">
                <IconNotification></IconNotification>
                <div className="absolute z-10 rounded-full bg-orange-500 w-3 h-3 top-0 right-0"></div>
              </div>

              <div className="header-avatar">
                <img src={userInfo?.avatar ? userInfo?.avatar : '/avatar.jpg'} alt="avatar" />
              </div>
              <div className="header-email" ref={nodeRef}>
                <span className={`user-email ${darkTheme ? 'text-white' : ''}`}>
                  {userInfo?.email}
                </span>
                <IconArrowDown></IconArrowDown>
                {show && <MenuUser className="mt-6 right-3" />}
              </div>
            </div>
            <div className={`dashboard-children ${darkTheme ? '!bg-black/80' : ''}`}>
              <Suspense>
                <Outlet />
              </Suspense>
            </div>
            <Link to="/" className="icon-home">
              <IconHome></IconHome>
            </Link>
          </div>
        </DashboardLayoutStyles>
      )}
    </>
  )
}

export default DashboardLayout
