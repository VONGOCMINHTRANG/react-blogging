import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardMenu from './DashboardMenu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { IconArrowDown, IconDark, IconHome, IconLight } from 'components/icon'
import { Suspense, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase-config'
import { Blur } from 'components/blur'
import { IconMenu } from 'components/icon'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'

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
    width: 52px;
    height: 52px;
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
`

const DashboardLayout = () => {
  const { userInfo } = useAuth()
  const { darkTheme, toggleDarkTheme } = useDarkTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [checkUser, setCheckUser] = useState(true)

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(29, 192, 113)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Login successfully', '', 'success')
        signOut(auth)
        window.location.reload()
        navigate(0)
      }
    })
  }

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

              <div className="header-avatar">
                <img src={userInfo?.avatar ? userInfo?.avatar : '/avatar.jpg'} alt="avatar" />
              </div>
              <div className="header-email group">
                <span className={darkTheme ? 'text-white' : ''}>{userInfo?.email}</span>
                <div>
                  <IconArrowDown></IconArrowDown>
                  <ul className="hidden group-hover:block absolute whitespace-nowrap right-3 text-sm transition-all rounded bg-slate-600 text-white">
                    <li
                      onClick={() =>
                        navigate(`${PATH.dashboard.account_infomation}${userInfo.username}`)
                      }
                      className="p-2 hover:bg-slate-300 hover:text-green-600"
                    >
                      Account Information
                    </li>
                    <li
                      onClick={() =>
                        navigate(`${PATH.dashboard.change_password}${userInfo.username}`)
                      }
                      className="p-2 hover:bg-slate-300 hover:text-green-600"
                    >
                      Change password
                    </li>
                    <li
                      onClick={toggleDarkTheme}
                      className="p-2 hover:bg-slate-300 hover:text-green-600 flex gap-2"
                    >
                      {darkTheme ? (
                        <>
                          Light theme
                          <IconLight></IconLight>
                        </>
                      ) : (
                        <>
                          Dark theme
                          <IconDark></IconDark>
                        </>
                      )}
                    </li>
                    <li
                      onClick={handleLogout}
                      className="p-2 hover:bg-slate-300 hover:text-green-600"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
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
