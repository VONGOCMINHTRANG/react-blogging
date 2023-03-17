import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const PostCategoryStyles = styled.div`
  margin-right: calc(0.5em + 0.5vw);
  display: inline-block;
  border-radius: calc(0.2vw + 0.3em);
  padding: 2px 7px;
  color: #909090;
  font-size: calc(0.5vw + 0.5em);
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor || 'rgb(243, 237, 255)'};
  text-align: center;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  @media (max-width: 540px) {
    .post-category {
      font-size: calc(0.5vw + 0.6em);
    }
  }
`

const PostCategory = ({ children, to = '/', ...props }) => {
  return (
    <PostCategoryStyles className="post-category" {...props}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  )
}

export default PostCategory
