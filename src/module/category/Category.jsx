import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import Search from 'components/search/Search'
import { Table } from 'components/table'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CategoryStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
  }
  .button:hover {
    background-color: #d3d3d3;
  }
  .search {
    margin-left: 0px;
  }
  .table-menu {
    overflow-x: auto;
    background-color: white;
    border-radius: 10px;
  }
  @media (max-width: 540px) {
    .utilities {
      flex-direction: column;
      gap: 20px;
    }
    .button {
      height: auto;
      padding: 15px 5px;
      font-size: 14px;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
      width: fit-content;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
  }
`

const Category = () => {
  return (
    <DashboardLayout>
      <CategoryStyles>
        <Content title="Categories" desc="Here is our categories"></Content>
        <div className="utilities">
          <Link to="/manage/add-category">
            <Button type="button" backgroundColor="#e7ecf3">
              Create category
            </Button>
          </Link>
          <Search placeholder="Search category..."></Search>
        </div>
        <div className="table-menu">
          <Table item1="Id" item2="Name" item3="Status" item4="Actions"></Table>
        </div>
      </CategoryStyles>
    </DashboardLayout>
  )
}

export default Category
