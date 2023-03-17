import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const PostTitleStyles = styled.h3`
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  a {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
  }
`

const PostTitle = ({ children, to = '/detail-post', ...props }) => {
  return (
    <PostTitleStyles className="post-title" {...props}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  )
}

export default PostTitle
