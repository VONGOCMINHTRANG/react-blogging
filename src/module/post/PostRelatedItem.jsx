import styled from 'styled-components'
import PostCategory from './PostCategory'
import PostImage from './PostImage'
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'

const PostRelatedItemStyles = styled.div`
  padding: 1em;
  background-color: rgb(243, 237, 255);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 400px;
  margin-bottom: 80px;
  cursor: pointer;
  .post {
    &-image {
      aspect-ratio: 16 / 9;
      height: 200px;
      margin-bottom: 10px;
    }
    &-category {
      background-color: white;
      margin-bottom: 20px;
    }
    &-title {
      margin-bottom: 10px;
      a {
        font-size: 18px;
      }
    }
    &-meta {
      color: #a0a0a0;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
`

const PostRelatedItem = () => {
  return (
    <PostRelatedItemStyles className="post-related-item">
      <PostImage></PostImage>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle>11 Best Things To Do In Nakhon Si Thammarat</PostTitle>
      <PostMeta></PostMeta>
    </PostRelatedItemStyles>
  )
}

export default PostRelatedItem
