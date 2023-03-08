import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PostImageStyles = styled.div`
  display: block;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '270px'};
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`

const PostImage = ({ to, src = '/background.jpg', ...props }) => {
  if (to) {
    return (
      <Link to={`/${to}`}>
        <PostImageStyles className="post-image" {...props}>
          <img src={src} alt="post-item" loading="lazy" />
        </PostImageStyles>
      </Link>
    )
  }
  return (
    <PostImageStyles className="post-image" {...props}>
      <img src={src} alt="post-item" loading="lazy" />
    </PostImageStyles>
  )
}

export default PostImage
