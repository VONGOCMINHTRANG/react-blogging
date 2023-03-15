import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import UserTable from './UserTable'
import Search from 'components/search/Search'
import { debounce } from 'lodash'
import { useAuth } from 'contexts/auth-context'
import { userRole } from 'utils/constants'

const UserStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
    color: white;
  }
  .search {
    margin-left: 0px;
  }
  .load-more {
    color: white;
    margin: 2.5rem auto;
    font-size: 15px;
    padding: 12px 40px;
  }
  @media (max-width: 540px) {
    .button {
      height: auto;
      padding: 15px 5px;
      font-size: 14px;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
    .load-more {
      font-size: 15px;
      padding: 12px 40px;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
      width: fit-content;
    }
  }
`

const USER_PER_PAGE = 1

const User = () => {
  const { userInfo } = useAuth()
  const [userList, setUserList] = useState([])
  const [filter, setFilter] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMore = async () => {
    try {
      const nextRef = query(collection(db, 'users'), startAfter(lastDoc), limit(USER_PER_PAGE))
      onSnapshot(nextRef, (snapshot) => {
        console.log(snapshot.size)
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setUserList([...userList, ...results])
      })
      const documentSnapshots = await getDocs(nextRef)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      setLastDoc(lastVisible)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const colRef = collection(db, 'users')
        const newRef = filter
          ? query(colRef, where('fullname', '>=', filter), where('fullname', '<=', filter + 'utf8'))
          : query(colRef, limit(4))

        const documentSnapshots = await getDocs(newRef)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        // console.log(documentSnapshots.docs[0].id)
        // console.log('last', lastVisible)
        setLastDoc(lastVisible)

        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size)
        })

        onSnapshot(newRef, (snapshot) => {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          setUserList(results)
        })
        setLastDoc(lastVisible)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategoryData()
  }, [filter])

  if (userInfo.role !== userRole.ADMIN) return null
  return (
    <DashboardLayout>
      <UserStyles>
        <Content title="User" desc="Manage your information."></Content>
        <div className="utilities">
          <div className="flex gap-10 w-full">
            <Link to="/manage/add-user">
              <Button type="button">Create user</Button>
            </Link>
            <Search placeholder="Search user..." onChange={handleInputFilter}></Search>
          </div>
        </div>
        <div className="flex py-2">Total of users : {total}</div>
        <UserTable data={userList}></UserTable>
        {total > userList.length && (
          <Button type="button" className="load-more" onClick={handleLoadMore}>
            Load more
          </Button>
        )}
      </UserStyles>
    </DashboardLayout>
  )
}

export default User
