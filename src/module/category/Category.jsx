import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import Search from 'components/search/Search'
import { Table } from 'components/table'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LabelStatus } from 'components/label'
import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { categoryStatus } from 'utils/constants'

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
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
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
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
    }
  }
`

const Category = () => {
  const [categoryList, setCategoryList] = useState([])
  const colRef = collection(db, 'categories')

  useEffect(() => {
    const fetchCategoryData = async () => {
      onSnapshot(colRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setCategoryList(results)
        console.log(categoryList)
      })
    }
    fetchCategoryData()
  }, [])

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
          <Table item1="Id" item2="Name" item3="Slug" item4="Status" item5="Actions">
            <tbody>
              {categoryList.length > 0 &&
                categoryList.map((item) => (
                  <tr key={item?.id}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>
                      <span className="italic text-gray-400">{item?.slug}</span>
                    </td>
                    <td>
                      {item?.status === categoryStatus.APPROVED ? (
                        <LabelStatus type="success">Approved</LabelStatus>
                      ) : (
                        <LabelStatus type="danger">Unapproved</LabelStatus>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-x-3">
                        <IconActionView></IconActionView>
                        <IconActionEdit></IconActionEdit>
                        <IconActionDelete></IconActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </CategoryStyles>
    </DashboardLayout>
  )
}

export default Category
