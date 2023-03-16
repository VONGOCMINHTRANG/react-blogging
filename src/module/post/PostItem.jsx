import styled from 'styled-components'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'
import { Overlay } from 'components/overlay'
import slugify from 'slugify'
import PropTypes from 'prop-types'

const PostItemStyles = styled.div`
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
  }
  a {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
  }
`

const PostItem = ({ data, ...props }) => {
  const time = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')
  return (
    <PostItemStyles className="post-item" {...props}>
      <PostImage to={`/detail-post/${data?.slug}`} src={data?.image}></PostImage>
      <Overlay></Overlay>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={`/category/${slugify(data?.category?.name || '', { lower: true })}`}>
            {data?.category?.name}
          </PostCategory>
          <PostMeta
            time={formatDate}
            author={data?.user?.fullname}
            to={`/${slugify(data?.user?.fullname || '', { lower: true })}`}
          ></PostMeta>
        </div>
        <PostTitle to={`/detail-post/${data?.slug}`}>{data?.title}</PostTitle>
      </div>
    </PostItemStyles>
  )
}

PostItem.propTypes = {
  data: PropTypes.array.isRequired,
}

export default PostItem
