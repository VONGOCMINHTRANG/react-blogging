import AuthorContent from 'module/author/AuthorContent'
import AuthorImage from 'module/author/AuthorImage'
import slugify from 'slugify'
import styled from 'styled-components'
import PostContentMain from './PostContentMain'

const PostContentStyles = styled.div`
  margin: 40px 0px;
  .author {
    width: fit-content;
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    padding: 1em;
    border-radius: 20px;
    background-color: rgb(243, 237, 255);
  }
`

const PostContent = ({ data }) => {
  return (
    <PostContentStyles>
      <div className="post-content">
        <PostContentMain title={data?.title} editor={data?.editor}></PostContentMain>
        <div className="author">
          <AuthorImage
            to={slugify(data?.user?.fullname || '', { lower: true })}
            src={data?.user?.avatar}
          ></AuthorImage>
          <AuthorContent name={data?.user?.fullname} email={data?.user?.email}></AuthorContent>
        </div>
      </div>
    </PostContentStyles>
  )
}

export default PostContent
