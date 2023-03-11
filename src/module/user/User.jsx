import { Button } from 'components/button'
import Content from 'components/content/Content'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import UserTable from './UserTable'

const UserStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
    color: white;
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
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const colRef = collection(db, 'users')
      onSnapshot(colRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setUserList(results)
      })
    }
    fetchUserData()
  }, [])

  return (
    <DashboardLayout>
      <UserStyles>
        <Content title="User" desc="Manage your information."></Content>
        <div className="utilities">
          <Link to="/manage/update-user">
            <Button type="button">Update user</Button>
          </Link>
          <Link to="/manage/add-user">
            <Button type="button">Create user</Button>
          </Link>
        </div>
        <UserTable data={userList}></UserTable>
      </UserStyles>
    </DashboardLayout>
  )
}

export default User
