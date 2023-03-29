import { Button } from 'components/button'
import { IconHome } from 'components/icon'
import LoadingSkeletonBlogPage from 'components/loading/LoadingSkeletonBlogPage'
import Search from 'components/search/Search'
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { debounce } from 'lodash'
import PostItem from 'module/post/PostItem'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase/firebase-config'

const POST_PER_PAGE = 6

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
  .load-more {
    color: white;
    margin: 4rem auto;
    font-size: 15px;
    padding: 12px 40px;
    width: fit-content;
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
  const [total, setTotal] = useState(0)
  const [lastDoc, setLastDoc] = useState()

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMore = async () => {
    try {
      const nextRef = query(collection(db, 'posts'), startAfter(lastDoc), limit(POST_PER_PAGE))

      onSnapshot(nextRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPosts([...posts, ...results])
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
        isLoading(true)
        const colRef = collection(db, 'posts')

        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size)
        })

        const newRef = filter
          ? query(colRef, where('title', '>=', filter), where('title', '<=', filter + 'utf8'))
          : query(colRef, limit(10))

        const documentSnapshots = await getDocs(newRef)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        // console.log(documentSnapshots.docs[0].id)
        // console.log('last', lastVisible)
        setLastDoc(lastVisible)

        onSnapshot(newRef, (snapshot) => {
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
          }, 150)
        })
      } catch (error) {
        console.log(error)
        isLoading(false)
      }
    }
    fetchPostData()
  }, [filter])

  return (
    <>
      {loading && <LoadingSkeletonBlogPage></LoadingSkeletonBlogPage>}

      {!loading && (
        <BlogPageStyles className="blog-page">
          <div className="wrapper">
            <div className="py-5">
              <Search onChange={handleInputFilter} placeholder="Search post in blog..."></Search>
            </div>

            <div className="container">
              <div className="blog-item">
                {posts?.length > 0 &&
                  posts.map((post) => <PostItem data={post} key={post.id}></PostItem>)}
              </div>
            </div>
            <h1>BLOG</h1>

            {total > posts.length && (
              <Button type="button" className="load-more" onClick={handleLoadMore}>
                Load more
              </Button>
            )}
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
