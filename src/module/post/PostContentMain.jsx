import styled from 'styled-components'
import PostImage from './PostImage'

const PostContentMainStyles = styled.div`
  margin: 40px 0px;
  .entry-content {
    font-size: 14px;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 30px;
    font-size: calc(1em + 1vw);
  }
  p {
    line-height: 2;
    margin-bottom: 20px;
    overflow-wrap: break-word;
    font-size: calc(0.5em + 1vw);
    font-weight: 500;
    color: #404040;
  }
  .image-content {
    border-radius: 8px;
    margin-bottom: 30px;
    height: auto;
    max-width: 100%;
  }
`

const PostContentMain = ({
  title = 'A One-Day Itinerary For Olpererhütte And The Schlegeis Bridge',
  src = 'https://images.unsplash.com/45/QDSMoAMTYaZoXpcwBjsL__DSC0104-1.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHdvcmtzcGFjZSUyMGRhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
}) => {
  return (
    <PostContentMainStyles className="entry-content">
      <h1>
        <strong>{title}</strong>
      </h1>
      <p>
        <PostImage className="image-content" src={src}></PostImage>
      </p>
      <p>
        For those of you who have a day to spare in Innsbruck and are looking for a day of epic
        adventure in the Austrian Alps, one of the most breathtaking hike syou can do is a hike to
        Olpererhütte, a mountain hut located in the middle of the Austrian Alps on the Olperer
        mountain, which is part of the Zillertal Alps, overlooking Schlegeis Stausee reservoir.
      </p>
      <p>
        The hike is also known as the place where you can get that epic photo of yourself on a
        floating suspension bridge you often see on Instagram. It is one of the best hiking
        experiences I had in Austria and if you are wondering if it can be done as a one-day trip
        from Innsbruck, you are in the right place.
      </p>
    </PostContentMainStyles>
  )
}

export default PostContentMain
