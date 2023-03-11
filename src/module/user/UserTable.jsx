import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { LabelStatus } from 'components/label'
import { Table } from 'components/table'
import { db } from '../../firebase/firebase-config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { userRole, userStatus } from 'utils/constants'
import { deleteUser } from 'firebase/auth'

const UserTableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 2.5rem;
  @media (max-width: 540px) {
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
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
  //   console.log(data)

  const navigate = useNavigate()
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

  return (
    <UserTableStyles className="table-menu">
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
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
                <td title={user?.id}>{user?.id.slice(0, 5) + '...'}</td>
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
                <td>{user?.username}</td>
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
                    <IconActionView></IconActionView>
                    <IconActionEdit
                      onClick={() => navigate(`/manage/update-user?id=${user?.id}`)}
                    ></IconActionEdit>
                    <IconActionDelete onClick={() => handleDeleteUser(user?.id)}></IconActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </UserTableStyles>
  )
}

export default UserTable
