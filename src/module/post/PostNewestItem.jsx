import styled from 'styled-components'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import slugify from 'slugify'

const PostNewestItemStyles = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  .info-right {
    margin-left: 16px;
  }
  .post {
    &-image {
      height: 130px;
      width: 200px;
    }
    &-category {
      color: #909090;
      margin-bottom: 8px;
      padding: 6px 10px;
      font-size: 14px;
    }
    &-title {
      margin-bottom: 8px;
    }
    &-title: hover {
      color: ${(props) => props.theme.secondary};
      transition: all 0.1s linear;
    }
    &-meta {
      a: hover {
        color: ${(props) => props.theme.secondary};
        transition: all 0.1s linear;
      }
    }
    &-meta {
      color: #a0a0a0;
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    .post {
      &-image {
        width: 100%;
        height: 100%;
        align-items: center;
        margin-bottom: 16px;
        img {
          width: auto;
          object-fit: contain;
        }
      }
    }
  }
`

const PostNewestItem = ({ data }) => {
  const time = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')

  return (
    <PostNewestItemStyles className="post-newest-item">
      <PostImage to={`/detail-post/${data?.slug}`} src={data?.image}></PostImage>
      <div className="info-right">
        <PostCategory
          to={`/category/${slugify(data?.category?.name || '', { lower: true })}`}
          backgroundColor="white"
        >
          {data?.category?.name}
        </PostCategory>
        <PostTitle fontSize="17px" to={`/detail-post/${data?.slug}`}>
          {data?.title}
        </PostTitle>
        <PostMeta
          time={formatDate}
          author={data?.user?.fullname}
          to={`/${slugify(data?.user?.fullname || '', { lower: true })}`}
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  )
}

export default PostNewestItem
