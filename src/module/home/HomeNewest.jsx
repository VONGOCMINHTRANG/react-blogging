import { Button } from 'components/button'
import { Title } from 'components/title'
import { db } from '../../firebase/firebase-config'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import PostNewestLeft from 'module/post/PostNewestLeft'
import PostNewestRight from 'module/post/PostNewestRight'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSkeletonHomeNewest from 'components/loading/LoadingSkeletonHomeNewest'
import { useDarkTheme } from 'contexts/theme-context'

const HomeNewestStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    .container{
        margin: 0 auto;
        transition: width .1s;
        width: 80vw;
        padding: 0;
    }
    .content{
        display: flex ;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
    }
    .view-all{
        margin-right: 0;
        font-size: 1em;
        color: white
        cursor: pointer;
        position: relative;
        height: 20px;
        background-color: rgb(58, 16, 151);
    }
    .layout{
        display: grid;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
        gap: 40px;
        margin-bottom: 64px;
        -webkit-box-align: start;
        align-items: start;
    }
    .sidebar{
        padding: 28px 20px;
        background-color: rgb(243, 237, 255);
        border-radius: 16px;
        display: flex;
        flex-direction: column;

    }
    @media (max-width: 1024px){
        .layout{
            display: flex;
            flex-direction: column;
            gap: 0;
        }
    }
    @media (max-width: 767px){
      .sidebar{
        flex-direction: row;
      }
    }
`

const HomeNewest = () => {
  const [posts, setPosts] = useState([])
  const [loading, isLoading] = useState(false)
  const navigate = useNavigate()
  const { darkTheme } = useDarkTheme()

  useEffect(() => {
    const postsRef = collection(db, 'posts')
    const fetchPostNewestData = async () => {
      try {
        isLoading(true)
        const q = query(postsRef, where('hot', '==', false), where('status', '==', 1), limit(4))
        onSnapshot(q, (snapshot) => {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          isLoading(false)
          setPosts(results)
        })
      } catch (error) {
        console.log(error)
        isLoading(true)
      }
    }

    fetchPostNewestData()
  }, [])

  const [first, ...others] = posts

  return (
    <>
      {loading && <LoadingSkeletonHomeNewest></LoadingSkeletonHomeNewest>}
      {!loading && (
        <HomeNewestStyles className={darkTheme ? 'bg-black/80' : ''}>
          <div className="container">
            <div className="content">
              <Title>Newest Update</Title>
              <Button type="button" className="view-all" onClick={() => navigate('/blog')}>
                View all
              </Button>
            </div>

            <div className="layout">
              <PostNewestLeft data={first}></PostNewestLeft>
              <div className="sidebar">
                <PostNewestRight data={others}></PostNewestRight>
              </div>
            </div>
          </div>
        </HomeNewestStyles>
      )}
    </>
  )
}

export default HomeNewest
