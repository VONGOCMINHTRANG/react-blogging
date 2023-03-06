import styled from 'styled-components'

const PostTitleStyles = styled.h3`
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  span {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
  }
`

const PostTitle = ({ children, ...props }) => {
  return (
    <PostTitleStyles className="post-title" {...props}>
      <span>{children}</span>
    </PostTitleStyles>
  )
}

export default PostTitle
