import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { Table } from 'components/table'
import { db } from '../../firebase/firebase-config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useAuth } from 'contexts/auth-context'
import { useEffect, useRef, useState } from 'react'
import { postStatus, userRole } from 'utils/constants'
import PostUserInfo from './PostUserInfo'
import PropTypes from 'prop-types'
import { PATH } from 'utils/path'

const PostTableStyles = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 2.5rem;
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

const PostTable = ({ data }) => {
  const { userInfo } = useAuth()
  const [admin, isAdmin] = useState(false)
  const navigate = useNavigate()
  const [info, setInfo] = useState(false)
  const dataPost = useRef([])

  const handleDeletePost = async (post) => {
    const colRef = doc(db, 'posts', post)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this post!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
        await deleteDoc(colRef)
      }
    })
  }

  const handleViewInfo = (post) => {
    dataPost.current = post
    setInfo(true)
  }

  useEffect(() => {
    try {
      if (userInfo.role === userRole.ADMIN) {
        isAdmin(true)
      }
    } catch (error) {
      console.log()
    }
  }, [userInfo])

  return (
    <PostTableStyles className="table-menu">
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((post) => (
              <tr key={post?.id}>
                <td title={post?.id}>{post?.id.slice(0, 5) + '...'}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post?.image ? post?.image : '/background.jpg'}
                      alt="post-img"
                      className="rounded-md object-cover w-10 h-10 flex-shrink-0"
                    />
                    <div className="flex-1 items-start flex flex-col">
                      <h3 title={post?.title}>{post?.title.slice(0, 20) + '...'}</h3>
                      <div className="text-sm text-gray-400">
                        {new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{post?.category?.name}</td>
                <td>{post?.user?.fullname}</td>
                <td>
                  <div className="flex justify-center items-center gap-x-3">
                    <IconActionView onClick={() => handleViewInfo(post)}></IconActionView>

                    {admin && (
                      <>
                        <IconActionEdit
                          onClick={() => navigate(`${PATH.dashboard.update_post}?id=${post?.id}`)}
                        ></IconActionEdit>
                        <IconActionDelete
                          onClick={() => handleDeletePost(post?.id)}
                        ></IconActionDelete>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

          {info && <PostUserInfo info={info} setInfo={setInfo} data={dataPost}></PostUserInfo>}
        </tbody>
      </Table>
    </PostTableStyles>
  )
}

PostTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default PostTable
