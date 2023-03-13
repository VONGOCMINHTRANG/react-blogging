import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AuthorImageStyles = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: solid 1px #cf9fff;
  border-radius: 100%;
  margin-right: 1em;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`

const AuthorImage = ({ to = '', src = '/avatar.jpg' }) => {
  if (to) {
    return (
      <Link to={`/${to}`} className="block">
        <AuthorImageStyles className="author-image">
          <img src={src} alt="author-image" loading="lazy" />
        </AuthorImageStyles>
      </Link>
    )
  }
  return (
    <AuthorImageStyles className="author-image">
      <img src={src} alt="author-image" loading="lazy" />
    </AuthorImageStyles>
  )
}

export default AuthorImage
