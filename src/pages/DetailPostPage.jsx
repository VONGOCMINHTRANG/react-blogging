import Layout from 'components/layout/Layout'
import { Title } from 'components/title'
import { db } from '../firebase/firebase-config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import PostContent from 'module/post/PostContent'
import PostHeader from 'module/post/PostHeader'
import PostRelated from 'module/post/PostRelated'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import NotFoundPage from './NotFoundPage'

const DetailPostPageStyles = styled.div`
  .container {
    width: 80vw;
    margin: 0 auto;
    transition: width 0.1s;
    padding: 0px;
  }
`

const DetailPostPage = () => {
  const { slug } = useParams()
  const [postInfo, setPostInfo] = useState({})
  useEffect(() => {
    const fetchDetailPostData = async () => {
      try {
        if (!slug) return
        const colRef = query(collection(db, 'posts'), where('slug', '==', slug))
        onSnapshot(colRef, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            setPostInfo(doc.data())
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetailPostData()
  }, [slug])

  if (!slug) return <NotFoundPage></NotFoundPage>
  return (
    <DetailPostPageStyles>
      <Layout>
        <div className="container">
          <PostHeader data={postInfo}></PostHeader>
          <PostContent data={postInfo}></PostContent>
          <div className="post-related">
            <Title>Related Posts</Title>
            <PostRelated></PostRelated>
          </div>
        </div>
      </Layout>
    </DetailPostPageStyles>
  )
}

export default DetailPostPage
