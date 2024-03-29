import Layout from 'layout/Layout'
import { Title } from 'components/title'
import { db } from '../firebase/firebase-config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import PostContent from 'module/post/PostContent'
import PostHeader from 'module/post/PostHeader'
import PostRelated from 'module/post/PostRelated'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSkeletonDetailPost from 'components/loading/LoadingSkeletonDetailPost'
import { useDarkTheme } from 'contexts/theme-context'
import { useTranslation } from 'react-i18next'

const DetailPostPageStyles = styled.div`
  .container {
    width: 80vw;
    margin: 0 auto;
    transition: width 0.1s;
    padding: 0px;
  }
  .post-header {
    margin: 0;
  }
  .post-info {
    width: 100%;
  }
  @media (max-width: 540px) {
    .container {
      width: 90vw;
    }
  }
`

const DetailPostPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const { darkTheme } = useDarkTheme()
  const [loading, isLoading] = useState(false)
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
              isLoading(false)
              setPostInfo(doc.data())
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
      {loading && <LoadingSkeletonDetailPost></LoadingSkeletonDetailPost>}

      {!loading && (
        <DetailPostPageStyles>
          <Layout>
            <div className={`wrapper ${darkTheme ? 'bg-black/80' : ''}`}>
              <div className="container">
                <PostHeader data={postInfo}></PostHeader>
                <PostContent data={postInfo}></PostContent>
                <div className="post-related">
                  <Title>{t(`Related Posts`)}</Title>
                  <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
                </div>
              </div>
            </div>
          </Layout>
        </DetailPostPageStyles>
      )}
    </>
  )
}

export default DetailPostPage
