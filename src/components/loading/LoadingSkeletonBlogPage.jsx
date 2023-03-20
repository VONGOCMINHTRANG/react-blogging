import styled from 'styled-components'

const LoadingSkeletonBlogPageStyles = styled.div`
  background-image: url('/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .wrapper {
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-bottom: 5rem;
  }
  .search {
    margin-left: auto;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    width: 100%;
    padding: 30px 45px 30px 20px;
    border-radius: 8px;
    margin: 20px 0px;
    background-color: ${(props) => props.theme.skeleton};
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
      height: 270px;
      background-color: ${(props) => props.theme.skeleton};
      border-radius: 16px;
    }
  }
  @media (max-width: 767px) {
    .blog-item {
      display: flex;
      flex-direction: column;
    }
  }
`

const LoadingSkeletonBlogPage = () => {
  return (
    <LoadingSkeletonBlogPageStyles>
      <div className="wrapper">
        <div className="search">
          <div className="search-input"></div>
        </div>
        <div className="container">
          <div className="blog-item">
            <div className="post-item"></div>
            <div className="post-item"></div>
            <div className="post-item"></div>
            <div className="post-item"></div>
          </div>
        </div>
        {/* <Search onChange={handleInputFilter}></Search>
        <div className="container">
          <div className="blog-item">
            {posts?.length > 0 &&
              posts.map((post) => <PostItem data={post} key={post.id}></PostItem>)}
          </div>
        </div>
        <h1>BLOG</h1>
        <Link to="/" className="icon-home">
          <IconHome></IconHome>
        </Link> */}
      </div>
    </LoadingSkeletonBlogPageStyles>
  )
}

export default LoadingSkeletonBlogPage
