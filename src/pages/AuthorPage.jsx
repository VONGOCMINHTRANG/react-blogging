import { IconHome } from 'components/icon'
import Search from 'components/search/Search'
import { db } from '../firebase/firebase-config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import PostItem from 'module/post/PostItem'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { postStatus } from 'utils/constants'
import { PATH } from 'utils/path'
import useClickOutsite from 'hooks/useClickOutside'

const AuthorPageStyles = styled.div`
  background-image: url('/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  .wrapper {
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-bottom: 5rem;
  }
  .search {
    z-index: 20;
  }
  /* .search-input {
    margin: 20px 0;
  } */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 80vw;
  }
  .blog-item {
    display: grid;
    grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
    gap: calc(1rem + 2vw);
    width: 100%;
    padding-top: 4rem;
  }
  .post {
    &-item {
      height: 275px;
    }
    &-category {
      background-color: rgb(29, 192, 113);
      a {
        color: white;
      }
    }
    &-title {
      width: fit-content;
    }
  }
  h1 {
    position: fixed;
    top: 0;
    left: 5rem;
    color: rgba(0, 0, 0, 0.4);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: calc(5rem + 5vw);
    pointer-events: none;
    z-index: 10;
  }
  .icon-home {
    position: fixed;
    bottom: 1em;
    right: 1em;
    padding: 1em;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 100%;
    cursor: pointer;
    z-index: 100;
    color: white;
  }
  @media (max-width: 767px) {
    .blog-item {
      display: flex;
      flex-direction: column;
    }
  }
`

const AuthorPage = () => {
  const { slug } = useParams()
  // console.log(slug)
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { show, setShow, nodeRef } = useClickOutsite()

  const handleSearch = () => {
    navigate(PATH.search, { state: searchQuery })
  }

  useEffect(() => {
    const docRef = query(collection(db, 'users'), where('username', '==', slug))
    onSnapshot(docRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserId(doc.id)
      })
    })
  }, [slug])

  useEffect(() => {
    const colRef = collection(db, 'posts')
    const q = query(
      colRef,
      where('userId', '==', userId),
      where('status', '==', postStatus.APPROVED)
    )
    onSnapshot(q, (snapshot) => {
      try {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPosts(results)
      } catch (error) {
        console.log(error)
      }
    })
  }, [userId])

  return (
    <AuthorPageStyles className="category-page">
      <div className="wrapper">
        <div className="py-5">
          <Search
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            placeholder="Search post..."
            show={show}
            setShow={setShow}
            nodeRef={nodeRef}
          ></Search>
        </div>

        <div className="container">
          <div className="blog-item">
            {posts?.length > 0 &&
              posts.map((post) => <PostItem key={post.id} data={post}></PostItem>)}
          </div>
        </div>
        <h1>{slug}</h1>
        <Link to="/" className="icon-home">
          <IconHome></IconHome>
        </Link>
      </div>
    </AuthorPageStyles>
  )
}

export default AuthorPage
