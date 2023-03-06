import styled from 'styled-components'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'

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
      width: 300px;
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

const PostNewestItem = () => {
  return (
    <PostNewestItemStyles className="post-newest-item">
      <PostImage></PostImage>
      <div className="info-right">
        <PostCategory backgroundColor="white">Kiến thức</PostCategory>
        <PostTitle fontSize="17px">A Complete Olpererhütte Hiking Guide From Innsbruck</PostTitle>
        <PostMeta></PostMeta>
      </div>
    </PostNewestItemStyles>
  )
}

export default PostNewestItem
