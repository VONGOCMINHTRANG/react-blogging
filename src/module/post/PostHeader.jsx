import PostCategory from 'module/post/PostCategory'
import PostImage from 'module/post/PostImage'
import PostMeta from 'module/post/PostMeta'
import PostTitle from 'module/post/PostTitle'
import styled from 'styled-components'

const PostHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin: 40px 0px;
  .post {
    &-image {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-info {
      flex: 1 1 0%;
      max-width: 640px;
    }
    &-category {
      color: #909090;
      margin-bottom: 8px;
      padding: 6px 10px;
      font-size: 18px;
    }
    &-title {
      a {
        font-size: 36px;
        margin-bottom: 16px;
      }
    }
    &-meta {
      color: gray;
      gap: 12px;
      font-size: calc(0.5em + 0.5vw);
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    .post {
      &-category {
        color: #909090;
        margin-bottom: 8px;
        padding: 6px 10px;
        font-size: 14px;
      }
      &-title {
        margin-bottom: 8px;
      }
      &-meta {
        color: #a0a0a0;
        font-size: 12px;
        margin-bottom: 8px;
      }
    }
  }
`

const PostHeader = ({ data }) => {
  const time = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')
  return (
    <PostHeaderStyles className="post-header">
      <PostImage src={data?.image}></PostImage>
      <div className="post-info">
        <PostCategory>{data?.category?.name}</PostCategory>
        <PostTitle>{data?.title}</PostTitle>
        <PostMeta time={formatDate} author={data?.user?.fullname}></PostMeta>
      </div>
    </PostHeaderStyles>
  )
}

export default PostHeader
