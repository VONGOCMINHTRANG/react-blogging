import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { Table } from 'components/table'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
  }
  .button:hover {
    background-color: #d3d3d3;
  }
  .table-menu {
    overflow-x: auto;
    background-color: white;
    border-radius: 10px;
  }
  @media (max-width: 540px) {
    .button {
      height: auto;
      padding: 15px 5px;
      font-size: 14px;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
    }
  }
`

const User = () => {
  return (
    <DashboardLayout>
      <UserStyles>
        <Content title="User" desc="Manage your information."></Content>
        <div className="utilities">
          <Link to="/manage/update-user">
            <Button type="button" backgroundColor="#e7ecf3">
              Update user
            </Button>
          </Link>
        </div>
        <div className="table-menu">
          <Table
            item1="Id"
            item2="Information"
            item3="Username"
            item4="Email address"
            item5="Actions"
          ></Table>
        </div>
      </UserStyles>
    </DashboardLayout>
  )
}

export default User
