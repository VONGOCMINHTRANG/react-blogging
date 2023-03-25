import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { LabelStatus } from 'components/label'
import { Table } from 'components/table'
import { db } from '../../firebase/firebase-config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { userRole, userStatus } from 'utils/constants'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import UserInfo from './UserInfo'
import { useAuth } from 'contexts/auth-context'

const UserTableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  @media (max-width: 540px) {
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
    }
    .status {
      display: flex;
      flex-direction: column;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
    }
  }
`

const UserTable = ({ data }) => {
  const { userInfo } = useAuth()
  const [admin, isAdmin] = useState(false)
  const navigate = useNavigate()
  const [info, setInfo] = useState(false)
  const dataUser = useRef([])

  const handleDeleteUser = async (user) => {
    const colRef = doc(db, 'users', user)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your user has been deleted.', 'success')
        await deleteDoc(colRef)
      }
    })
  }

  const handleViewInfo = (user) => {
    dataUser.current = user
    setInfo(true)
  }

  useEffect(() => {
    try {
      if (userInfo.role === userRole.ADMIN) {
        isAdmin(true)
      }
    } catch (error) {
      console.log(error)
    }
  }, [userInfo])

  return (
    <UserTableStyles className="table-menu">
      <Table>
        <thead>
          <tr>
            <th>Info</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((user) => (
              <tr key={user?.id}>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user?.avatar ? user?.avatar : '/avatar.jpg'}
                      alt="avatar"
                      className="rounded-full object-cover w-10 h-10 flex-shrink-0"
                    />
                    <div className="flex-1 items-start flex flex-col">
                      <h3>{user?.fullname}</h3>
                      <div className="text-sm text-gray-400">
                        {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}
                      </div>
                    </div>
                  </div>
                </td>
                <td title={user?.email}>{user?.email.slice(0, 5) + '...'}</td>
                <td>
                  {Number(user?.status) === userStatus.ACTIVE && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )}
                  {Number(user?.status) === userStatus.PENDING && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {Number(user?.status) === userStatus.BANNED && (
                    <LabelStatus type="danger">Banned</LabelStatus>
                  )}
                </td>
                <td>
                  {Number(user?.role) === userRole.ADMIN && (
                    <LabelStatus type="danger">Admin</LabelStatus>
                  )}
                  {Number(user?.role) === userRole.MODERATOR && (
                    <LabelStatus type="warning">Moderator</LabelStatus>
                  )}
                  {Number(user?.role) === userRole.EDITOR && (
                    <LabelStatus type="success">Editor</LabelStatus>
                  )}
                  {Number(user?.role) === userRole.USER && (
                    <LabelStatus type="alert">User</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex justify-center items-center gap-x-3">
                    <IconActionView onClick={() => handleViewInfo(user)}></IconActionView>

                    <IconActionEdit
                      onClick={() =>
                        navigate(
                          admin
                            ? `/manage/update-user?id=${user?.id}`
                            : `/manage/account-information/${user?.id}`
                        )
                      }
                    ></IconActionEdit>

                    {admin && (
                      <IconActionDelete
                        onClick={() => handleDeleteUser(user?.id)}
                      ></IconActionDelete>
                    )}
                  </div>
                </td>
              </tr>
            ))}

          {info && <UserInfo info={info} setInfo={setInfo} data={dataUser}></UserInfo>}
        </tbody>
      </Table>
    </UserTableStyles>
  )
}

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default UserTable
