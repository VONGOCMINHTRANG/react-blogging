import styled from 'styled-components'

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

const AuthorContent = ({ name = 'Vo Ngoc Minh Trang', email = 'vnmt2712@gmail.com', ...props }) => {
  return (
    <AuthorContentStyles className="author-content" {...props}>
      <div className="author-name">Vo Ngoc Minh Trang</div>
      <div className="author-email">vnmt2712@gmail.com</div>
    </AuthorContentStyles>
  )
}

export default AuthorContent
