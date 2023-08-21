import PostCategory from 'module/post/PostCategory'
import PostImage from 'module/post/PostImage'
import PostMeta from 'module/post/PostMeta'
import PostTitle from 'module/post/PostTitle'
import slugify from 'slugify'
import styled from 'styled-components'

const PostHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding-top: 20px;

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
      cursor: pointer;
      background-color: rgb(29, 192, 113);
      margin-bottom: 8px;
      font-size: 18px;
      a {
        color: white;
      }
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
      a: hover {
        color: ${(props) => props.theme.secondary};
        transition: all 0.1s linear;
      }
      margin-bottom: 16px;
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    .post {
      &-title {
        margin-bottom: 8px;
      }
      &-meta {
        color: #a0a0a0;
        font-size: 13px;
        margin-bottom: 8px;
      }
      &-author {
        font-size: 13px;
      }
      &-image {
        max-width: 100%;
      }
      &-info {
        max-width: 100%;
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
        <PostCategory to={`/category/${slugify(data?.category?.name || '', { lower: true })}`}>
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={`/detail-post/${slugify(data?.title || '', { lower: true })}`}>
          {data?.title}
        </PostTitle>
        <PostMeta
          time={formatDate}
          author={data?.user?.fullname}
          to={`/author/${slugify(data?.user?.fullname || '', { lower: true })}`}
        ></PostMeta>
      </div>
    </PostHeaderStyles>
  )
}

export default PostHeader
