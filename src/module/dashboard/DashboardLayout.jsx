import { Logout } from 'components/logout'
import { Menu } from 'components/menu'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'

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
  @media (max-width: 949px) {
    .dashboard-children {
      padding: 20px;
    }
  }
`

const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth()
  if (!userInfo) return <NotFoundPage></NotFoundPage>

  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Menu></Menu>
        <Logout></Logout>
        <div className="dashboard-children">{children}</div>
      </div>
    </DashboardLayoutStyles>
  )
}

export default DashboardLayout
