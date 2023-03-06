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

const PostImage = ({
  to = '',
  src = 'https://firebasestorage.googleapis.com/v0/b/monkey-blogging-eb36b.appspot.com/o/images%2Fhinh-nen-4k-dep-cho-may-tinh-laptop-ipad-dien-thoai-di-dong-21.jpg?alt=media&token=2541ff63-997b-4eb1-beda-71066b68df20',
  ...props
}) => {
  if (to) {
    return (
      <div className="block">
        <PostImageStyles className="post-image" {...props}>
          <img src={src} alt="post-item" loading="lazy" />
        </PostImageStyles>
      </div>
    )
  }
  return (
    <PostImageStyles className="post-image" {...props}>
      <img src={src} alt="post-item" loading="lazy" />
    </PostImageStyles>
  )
}

export default PostImage
