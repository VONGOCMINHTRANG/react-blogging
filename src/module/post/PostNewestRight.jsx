import styled from 'styled-components'
import PostNewestItem from './PostNewestItem'

const PostNewestRightStyles = styled.div`
  height: auto;
`

const PostNewestRight = () => {
  return (
    <PostNewestRightStyles>
      <PostNewestItem></PostNewestItem>
      <PostNewestItem></PostNewestItem>
      <PostNewestItem></PostNewestItem>
    </PostNewestRightStyles>
  )
}

export default PostNewestRight
