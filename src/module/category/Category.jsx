import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import Search from 'components/search/Search'
import { Table } from 'components/table'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LabelStatus } from 'components/label'
import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { useEffect, useRef, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { categoryStatus } from 'utils/constants'
import Swal from 'sweetalert2'
import { debounce } from 'lodash'

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
  const [categoryCount, setCategoryCount] = useState(0)
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, 'categories', docId)

    // console.log(docData.data())
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this category!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        await deleteDoc(colRef)
      }
    })
  }

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  useEffect(() => {
    const colRef = collection(db, 'categories')
    const newRef = filter
      ? query(colRef, where('name', '>=', filter), where('name', '<=', filter + 'utf8'))
      : colRef
    const fetchCategoryData = async () => {
      onSnapshot(newRef, (snapshot) => {
        setCategoryCount(snapshot.size)
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setCategoryList(results)
      })
    }
    fetchCategoryData()
  }, [filter])

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
          <Search placeholder="Search category..." onChange={handleInputFilter}></Search>
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
                      {Number(item?.status) === categoryStatus.APPROVED ? (
                        <LabelStatus type="success">Approved</LabelStatus>
                      ) : (
                        <LabelStatus type="danger">Unapproved</LabelStatus>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-x-3">
                        <IconActionView></IconActionView>
                        <IconActionEdit
                          onClick={() => navigate(`/manage/update-category?id=${item?.id}`)}
                        ></IconActionEdit>
                        <IconActionDelete
                          onClick={() => handleDeleteCategory(item?.id)}
                        ></IconActionDelete>
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
