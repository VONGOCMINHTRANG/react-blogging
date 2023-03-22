import Layout from 'layout/Layout'
import { Title } from 'components/title'
import { db } from '../firebase/firebase-config'
import { collection, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore'
import PostContent from 'module/post/PostContent'
import PostHeader from 'module/post/PostHeader'
import PostRelated from 'module/post/PostRelated'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import NotFoundPage from './NotFoundPage'
import LoadingSkeletonDetailPost from 'components/loading/LoadingSkeletonDetailPost'
import LoadingSkeletonHeader from 'components/loading/LoadingSkeletonHeader'

const DetailPostPageStyles = styled.div`
  .container {
    width: 80vw;
    margin: 0 auto;
    transition: width 0.1s;
    padding: 0px;
  }
`

const DetailPostPage = () => {
  const [loading, isLoading] = useState(false)
  const { slug } = useParams()
  const [postInfo, setPostInfo] = useState({})
  useEffect(() => {
    const fetchDetailPostData = async () => {
      try {
        if (!slug) return
        isLoading(true)
        const colRef = query(collection(db, 'posts'), where('slug', '==', slug))
        onSnapshot(colRef, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data()) {
              setTimeout(() => {
                isLoading(false)
                setPostInfo(doc.data())
              }, 250)
            }
          })
        })
      } catch (error) {
        isLoading(true)
        console.log(error)
      }
    }
    fetchDetailPostData()
  }, [slug])

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [slug])

  return (
    <>
      {loading && (
        <>
          <LoadingSkeletonHeader></LoadingSkeletonHeader>
          <LoadingSkeletonDetailPost></LoadingSkeletonDetailPost>
        </>
      )}

      {!loading && (
        <DetailPostPageStyles>
          <Layout>
            <div className="container">
              <PostHeader data={postInfo}></PostHeader>
              <PostContent data={postInfo}></PostContent>
              <div className="post-related">
                <Title>Related Posts</Title>
                <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
              </div>
            </div>
          </Layout>
        </DetailPostPageStyles>
      )}
    </>
  )
}

export default DetailPostPage
