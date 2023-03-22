import { Sidebar } from 'components/sidebar'
import styled from 'styled-components'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'

const DashboardMenuStyles = styled.div`
  background-color: white;
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .sidebar {
    height: auto;
    min-height: 100vh;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
      background-position: center center;
    }
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
`

const DashboardMenu = ({ open, setOpen = () => {} }) => {
  const { userInfo } = useAuth()

  if (!userInfo) return <NotFoundPage></NotFoundPage>
  return (
    <DashboardMenuStyles className="dashboard-menu">
      <Sidebar
        number1="2"
        number2="7"
        className={open ? 'sidebar visible translate-x-0' : 'sidebar invisible -translate-x-full'}
        setOpen={setOpen}
      ></Sidebar>
    </DashboardMenuStyles>
  )
}

export default DashboardMenu
