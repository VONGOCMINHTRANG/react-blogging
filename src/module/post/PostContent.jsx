import AuthorContent from 'module/author/AuthorContent'
import AuthorImage from 'module/author/AuthorImage'
import { Link } from 'react-router-dom'
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
    cursor: pointer;
  }
`

const PostContent = () => {
  return (
    <PostContentStyles>
      <div className="post-content">
        <PostContentMain></PostContentMain>
        <div className="author">
          <AuthorImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJJ0-fWdGnRwxXq6CXOWZ-YdbaVg76wle3w&usqp=CAU"></AuthorImage>
          <AuthorContent></AuthorContent>
        </div>
      </div>
    </PostContentStyles>
  )
}

export default PostContent
