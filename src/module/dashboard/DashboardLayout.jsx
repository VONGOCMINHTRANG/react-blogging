import { Menu } from 'components/menu'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'

const DashboardLayoutStyles = styled.div`
  .dashboard-main {
    padding: 40px 20px;
    gap: 0px 40px;
    display: flex;
    width: 100%;
  }
  .dashboard-children {
    margin-left: 2em;
    background-color: white;
    width: 100%;
  }
  @media (max-width: 767px) {
    .dashboard-main {
      padding: 20px;
    }
    .dashboard-children {
      margin-left: 0px;
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
        <div className="dashboard-children">{children}</div>
      </div>
    </DashboardLayoutStyles>
  )
}

export default DashboardLayout
