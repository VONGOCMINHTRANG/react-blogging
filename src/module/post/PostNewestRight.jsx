import styled from 'styled-components'
import PostNewestItem from './PostNewestItem'

const PostNewestRightStyles = styled.div`
  height: auto;
`

const PostNewestRight = ({ data }) => {
  return (
    <PostNewestRightStyles>
      {data?.length > 0 &&
        data?.map((post) => <PostNewestItem key={post.id} data={post}></PostNewestItem>)}
    </PostNewestRightStyles>
  )
}

export default PostNewestRight
