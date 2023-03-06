import DashboardLayout from 'module/dashboard/DashboardLayout'
import Search from 'components/search/Search'
import { Table } from 'components/table'
import styled from 'styled-components'
import { Dropdown } from 'components/dropdown'
import { Content } from 'components/content'

const PostsStyles = styled.div`
  .dropdown {
    width: 150px;
    color: ${(props) => props.theme.secondary};
    span {
      font-weight: bold;
    }
  }
  .dropdown:hover {
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
    .dropdown {
      padding: 12px 10px;
      span {
        font-size: 14px;
      }
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .dropdown {
      padding: 12px 10px;
      span {
        font-size: 14px;
      }
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
  }
`

const Posts = () => {
  return (
    <DashboardLayout>
      <PostsStyles>
        <Content title="All posts" desc="Manage all your posts easily here"></Content>
        <div className="utilities">
          <Dropdown></Dropdown>
          <Search></Search>
        </div>
        <div className="table-menu">
          <Table item1="Id" item2="Post" item3="Category" item4="Author" item5="Actions"></Table>
        </div>
      </PostsStyles>
    </DashboardLayout>
  )
}

export default Posts
