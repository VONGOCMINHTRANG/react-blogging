import { IconHome } from 'components/icon'
import LoadingSkeletonBlogPage from 'components/loading/LoadingSkeletonBlogPage'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import PostItem from 'module/post/PostItem'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase/firebase-config'
import { postStatus } from 'utils/constants'

const SearchPageStyles = styled.div`
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
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 80vw;
  }
  .total-result {
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
  h3 {
    padding-top: 4rem;
    width: 80vw;
    color: white;
    font-size: 30px;
    font-weight: bold;
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
    h3 {
      font-size: 25px;
    }
    .blog-item {
      display: flex;
      flex-direction: column;
    }
  }
`

const SearchPage = () => {
  const { state } = useLocation()
  const [loading, isLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const totalResult = useRef()

  useEffect(() => {
    const colRef = collection(db, 'posts')
    const q = query(
      colRef,
      where('title', '>=', state),
      where('title', '<=', state + 'utf8'),
      where('status', '==', postStatus.APPROVED)
    )

    onSnapshot(q, (snapshot) => {
      try {
        totalResult.current = snapshot.size
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
  }, [state])

  return (
    <SearchPageStyles className="blog-page">
      <div className="wrapper">
        <div className="total-result">
          <h3>
            {totalResult.current} results : '{state}'
          </h3>
        </div>

        <div className="container">
          <div className="blog-item">
            {posts?.length > 0 &&
              posts.map((post) => <PostItem data={post} key={post.id}></PostItem>)}
          </div>
        </div>
        <Link to="/" className="icon-home">
          <IconHome></IconHome>
        </Link>
      </div>
    </SearchPageStyles>
  )
}

export default SearchPage
