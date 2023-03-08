import Layout from 'components/layout/Layout'
import { Title } from 'components/title'
import PostContent from 'module/post/PostContent'
import PostHeader from 'module/post/PostHeader'
import PostRelated from 'module/post/PostRelated'
import styled from 'styled-components'

const DetailPostPageStyles = styled.div`
  .container {
    width: 80vw;
    margin: 0 auto;
    transition: width 0.1s;
    padding: 0px;
  }
`

const DetailPostPage = () => {
  return (
    <DetailPostPageStyles>
      <Layout>
        <div className="container">
          <PostHeader></PostHeader>
          <PostContent></PostContent>
          <div className="post-related">
            <Title>Related Posts</Title>
            <PostRelated></PostRelated>
          </div>
        </div>
      </Layout>
    </DetailPostPageStyles>
  )
}

export default DetailPostPage
