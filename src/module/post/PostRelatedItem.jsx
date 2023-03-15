import slugify from 'slugify'
import styled from 'styled-components'
import PostCategory from './PostCategory'
import PostImage from './PostImage'
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'

const PostRelatedItemStyles = styled.div`
  background-color: rgb(243, 237, 255);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  margin-bottom: 80px;
  width: 100%;
  cursor: pointer;
  a {
    width: 100%;
  }
  .post {
    &-image {
      width: 100%;
      padding: 15px;
      height: 200px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    &-category {
      margin-right: auto;
      margin-left: 15px;
      background-color: white;
      margin-bottom: 15px;
    }
    &-title {
      margin-right: auto;
      margin-bottom: 10px;
      margin-left: 15px;
      a {
        font-size: 18px;
      }
    }
    &-title: hover {
      color: ${(props) => props.theme.secondary};
      transition: all 0.1s linear;
    }
    &-meta {
      color: #a0a0a0;
      font-size: 12px;
      margin-bottom: 10px;
      margin-left: 15px;
      margin-right: auto;
      a: hover {
        color: ${(props) => props.theme.secondary};
        transition: all 0.1s linear;
      }
    }
    &-dot {
      width: 10px;
    }
  }
`

const PostRelatedItem = ({ post }) => {
  const time = post?.createdAt?.seconds ? new Date(post?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')

  return (
    <PostRelatedItemStyles className="post-related-item">
      <PostImage to={`/detail-post/${post?.slug}`} src={post.image}></PostImage>
      <PostCategory to={`/category/${post?.category?.slug}`}>{post?.category?.name}</PostCategory>
      <PostTitle to={`/detail-post/${post?.slug}`}>{post?.title}</PostTitle>
      <PostMeta
        time={formatDate}
        author={post?.user?.fullname}
        to={`/${slugify(post?.user?.fullname || '', { lower: true })}`}
      ></PostMeta>
    </PostRelatedItemStyles>
  )
}

export default PostRelatedItem
