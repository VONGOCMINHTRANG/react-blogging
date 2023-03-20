import { IconHome } from 'components/icon'
import LoadingSkeletonBlogPage from 'components/loading/LoadingSkeletonBlogPage'
import Search from 'components/search/Search'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { debounce } from 'lodash'
import PostItem from 'module/post/PostItem'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase/firebase-config'

const BlogPageStyles = styled.div`
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
  .search-input {
    margin: 20px 0;
  }
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

const BlogPage = () => {
  const [loading, isLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('')
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  useEffect(() => {
    const colRef = collection(db, 'posts')
    const q = filter
      ? query(colRef, where('title', '>=', filter), where('title', '<=', filter + 'utf8'))
      : colRef
    onSnapshot(q, (snapshot) => {
      try {
        isLoading(true)
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setTimeout(() => {
          isLoading(false)
          setPosts(results)
        }, 250)
      } catch (error) {
        isLoading(true)
        console.log(error)
      }
    })
  }, [filter])

  return (
    <>
      {loading && <LoadingSkeletonBlogPage></LoadingSkeletonBlogPage>}

      {!loading && (
        <BlogPageStyles className="blog-page">
          <div className="wrapper">
            <Search onChange={handleInputFilter}></Search>
            <div className="container">
              <div className="blog-item">
                {posts?.length > 0 &&
                  posts.map((post) => <PostItem data={post} key={post.id}></PostItem>)}
              </div>
            </div>
            <h1>BLOG</h1>
            <Link to="/" className="icon-home">
              <IconHome></IconHome>
            </Link>
          </div>
        </BlogPageStyles>
      )}
    </>
  )
}

export default BlogPage
