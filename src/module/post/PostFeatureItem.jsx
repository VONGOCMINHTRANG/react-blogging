import styled from 'styled-components'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'
import slugify from 'slugify'
import { Overlay } from 'components/overlay'

const PostFeatureItemStyles = styled.div`
  height: 270px;
  width: 100%;
  border-radius: 16px;
  position: relative;
  cursor: pointer;

  .post {
    &-content {
      position: absolute;
      inset: 0px;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  a {
    font-weight: bold;
    line-height: 1.5;
  }
  @media (max-width: 767px) {
    .post {
      &-top {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 7px;
      }
      &-category {
        padding: 5px 13px;
        font-size: 15px;
      }
      &-meta,
      &-author {
        font-size: 12px;
      }
    }
  }
`
const PostFeatureItem = ({ data }) => {
  const { category, user } = data
  const time = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     if (data.categoryId) {
  //       const docRef = doc(db, 'categories', data.categoryId)
  //       const docSnap = await getDoc(docRef)
  //       if (docSnap.exists()) {
  //         setCategory(docSnap.data())
  //       } else {
  //         console.log(`Can't find category document!`)
  //       }
  //     }
  //   }
  //   fetchCategory()
  // }, [data.categoryId])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (data.userId) {
  //       const docRef = doc(db, 'users', data.userId)
  //       const docSnap = await getDoc(docRef)
  //       if (docSnap.exists()) {
  //         setUser(docSnap.data())
  //       } else {
  //         console.log(`Can't find user document!`)
  //       }
  //     }
  //   }

  //   fetchUser()
  // }, [data.userId])

  if (!data || !data.id) return null

  return (
    <PostFeatureItemStyles className="post-feature-item">
      <PostImage src={data.image}></PostImage>
      <Overlay></Overlay>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={category.slug}>{category.name}</PostCategory>
          <PostMeta
            time={formatDate}
            author={user.fullname}
            to={slugify(user.fullname || '', { lower: true })}
          ></PostMeta>
        </div>
        <PostTitle to={`/detail-post/${data?.slug}`}>{data.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  )
}

export default PostFeatureItem
