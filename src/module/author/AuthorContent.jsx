import styled from 'styled-components'
import PropTyles from 'prop-types'

const AuthorContentStyles = styled.div`
  .author {
    &-name {
      font-weight: bold;
      font-size: calc(0.5em + 0.5vw);
    }
    &-email {
      font-size: calc(0.3em + 0.5vw);
      line-height: 2;
    }
  }
  @media (max-width: 950px) {
    .author {
      &-name {
        font-size: calc(0.7em + 0.5vw);
      }
      &-email {
        font-size: calc(0.5em + 0.5vw);
      }
    }
  }
`

const AuthorContent = ({ name = '', email = '', ...props }) => {
  return (
    <AuthorContentStyles className="author-content" {...props}>
      <div className="author-name">{name}</div>
      <div className="author-email">{email}</div>
    </AuthorContentStyles>
  )
}

AuthorContent.propTypes = {
  name: PropTyles.string,
  email: PropTyles.string,
}

export default AuthorContent
