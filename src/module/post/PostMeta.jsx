import styled from 'styled-components'

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${(props) => props.fontSize || 'calc(0.5em + 0.2vw)'};
  font-weight: bold;
  color: ${(props) => props.color || 'white'};
  .post {
    &-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: currentcolor;
      border-radius: 100rem;
    }
    &-author {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  @media (max-width: 540px) {
    .post-meta {
      font-size: calc(0.5em + 0.5vw);
    }
  }
`

const PostMeta = ({ time = '27/12/2023', author = 'Vo Ngoc Minh Trang', ...props }) => {
  return (
    <PostMetaStyles className="post-meta" {...props}>
      <span className="post-time">{time}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
    </PostMetaStyles>
  )
}

export default PostMeta
