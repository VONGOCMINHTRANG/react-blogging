import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 30px;
  .logo {
    margin: 0 auto 20px;
    max-width: 90px;
    height: auto;
    display: block;
    cursor: pointer;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    font-size: min(2em, 5vw);
    margin-bottom: 30px;
  }
`

const AuthenticationPage = ({ children }) => {
  const navigate = useNavigate()

  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img
          className="logo"
          srcSet="/logo.png"
          alt="react-blogging"
          onClick={() => navigate('/')}
        />
        <h1 className="heading">React Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  )
}

export default AuthenticationPage
