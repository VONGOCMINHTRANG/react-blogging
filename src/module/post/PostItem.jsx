import styled from 'styled-components'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'
import { Overlay } from 'components/overlay'

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
  }
  a {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
  }
`

const PostItem = ({
  category = 'Kiến thức',
  title = 'A Complete Olpererhütte Hiking Guide From Innsbruck',
  time,
  author,
  src,
  to,
  ...props
}) => {
  return (
    <PostItemStyles className="post-item" {...props}>
      <PostImage to={to} src={src}></PostImage>
      <Overlay></Overlay>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>{category}</PostCategory>
          <PostMeta time={time} author={author}></PostMeta>
        </div>
        <PostTitle>{title}</PostTitle>
      </div>
    </PostItemStyles>
  )
}

export default PostItem
