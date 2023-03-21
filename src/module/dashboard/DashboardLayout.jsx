import { Logout } from 'components/logout'
import { Menu } from 'components/menu'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'
import { Link, Outlet } from 'react-router-dom'
import { IconHome } from 'components/icon'
import { Suspense } from 'react'

const DashboardLayoutStyles = styled.div`
  .dashboard-main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .dashboard-children {
    padding: 0 20px;
    background-color: white;
    width: 100%;
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
  @media (max-width: 949px) {
    .dashboard-children {
      padding: 20px;
    }
  }
`

const DashboardLayout = () => {
  const { userInfo } = useAuth()
  if (!userInfo) return <NotFoundPage></NotFoundPage>

  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Menu></Menu>
        <Logout></Logout>
        <div className="dashboard-children">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Link to="/" className="icon-home">
          <IconHome></IconHome>
        </Link>
      </div>
    </DashboardLayoutStyles>
  )
}

export default DashboardLayout
