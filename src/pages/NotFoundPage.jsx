import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    max-width: 100px;
    display: inline-block;
    margin-bottom: 30px;
  }
  .heading {
    font-size: 40px;
    font-weight: bold;
    opacity: 0.8;
    margin-bottom: 30px;
    color: #585858;
  }
  .back {
    display: inline-block;
    padding: 15px 20px;
    color: white;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 4px;
    font-weight: 600;
  }
`

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className={'logo'}>
        <img srcSet="/logo.png" alt="react-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink className={'back'} to="/">
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  )
}

export default NotFoundPage
