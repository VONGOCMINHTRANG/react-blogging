import { IconHome } from 'components/icon'
import Search from 'components/search/Search'
import PostItem from 'module/post/PostItem'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogPageStyles = styled.div`
  background-image: url('/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  .wrapper {
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-bottom: 5rem;
  }
  .search {
    z-index: 20;
  }
  .search-input {
    margin: 20px 0;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 80vw;
  }
  .blog-item {
    display: grid;
    grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
    gap: calc(1rem + 2vw);
    width: 100%;
    padding-top: 4rem;
  }
  .post {
    &-item {
      height: 275px;
    }
  }
  h1 {
    position: fixed;
    top: 0;
    left: 5rem;
    color: rgba(0, 0, 0, 0.4);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: calc(5rem + 5vw);
    pointer-events: none;
    z-index: 10;
  }
  .icon-home {
    position: fixed;
    bottom: 1em;
    right: 1em;
    padding: 1em;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 100%;
    cursor: pointer;
    z-index: 100;
    text-color: white;
  }
  @media (max-width: 767px) {
    .blog-item {
      display: flex;
      flex-direction: column;
    }
  }
`

const BlogPage = () => {
  return (
    <BlogPageStyles className="blog-page">
      <div className="wrapper">
        <Search></Search>
        <div className="container">
          <div className="blog-item">
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
          </div>
        </div>
        <h1>BLOG</h1>
        <Link to="/" className="icon-home">
          <IconHome></IconHome>
        </Link>
      </div>
    </BlogPageStyles>
  )
}

export default BlogPage
