import Search from 'components/search/Search'
import styled from 'styled-components'
import { Content } from 'components/content'
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
import { debounce } from 'lodash'
import PostTable from './PostTable'
import { Button } from 'components/button'
import { Link } from 'react-router-dom'
import { useAuth } from 'contexts/auth-context'
import { userRole } from 'utils/constants'
import NotFoundPage from 'pages/NotFoundPage'

const PostsStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
    color: white;
    white-space: nowrap;
  }
  .search {
    margin-left: 0px;
  }
  .load-more {
    color: white;
    margin: 1rem auto;
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

const POST_PER_PAGE = 1

const Posts = () => {
  const { userInfo } = useAuth()
  const [postList, setPostList] = useState([])
  const [filter, setFilter] = useState('')
  const [total, setTotal] = useState(0)
  const [lastDoc, setLastDoc] = useState()
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMore = async () => {
    try {
      const nextRef = query(collection(db, 'posts'), startAfter(lastDoc), limit(POST_PER_PAGE))
      onSnapshot(nextRef, (snapshot) => {
        // console.log(snapshot.size)
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPostList([...postList, ...results])
      })
      const documentSnapshots = await getDocs(nextRef)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      setLastDoc(lastVisible)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const colRef = collection(db, 'posts')
        const newRef = filter
          ? query(colRef, where('title', '>=', filter), where('title', '<=', filter + 'utf8'))
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
          setPostList(results)
        })
        setLastDoc(lastVisible)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPostData()
  }, [filter])

  if (userInfo.role !== userRole.ADMIN) return <NotFoundPage></NotFoundPage>
  return (
    <PostsStyles>
      <Content title="Post" desc="Manage all posts."></Content>
      <div className="utilities">
        <div className="flex gap-10 w-full">
          <Link to="/manage/add-post">
            <Button type="button">Create post</Button>
          </Link>
          <Search placeholder="Search post..." onChange={handleInputFilter}></Search>
        </div>
      </div>
      <div className="flex py-2">Total of users : {total}</div>
      <PostTable data={postList}></PostTable>
      {total > postList.length && (
        <Button type="button" className="load-more" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </PostsStyles>
  )
}

export default Posts
