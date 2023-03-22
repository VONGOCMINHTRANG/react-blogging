import { Title } from 'components/title'
import FooterLeft from 'module/footer/FooterLeft'
import FooterRight from 'module/footer/FooterRight'
import styled from 'styled-components'

const FooterStyles = styled.div`
  background-color: rgb(243, 237, 255);
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 28px 20px;
  color: ${(props) => props.theme.secondary};
  .title {
    color: ${(props) => props.theme.secondary} !important;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  .title {
    color: gray;
    border-top: none;
  }
  .logo {
    display: block;
    max-width: 200px;
    height: auto;
  }
  @media (max-width: 950px) {
    .container {
      display: flex;
      flex-direction: column;
    }
  }
`

const Footer = () => {
  return (
    <FooterStyles>
      <div className="container">
        <div className="flex flex-col justify-center gap-y-2">
          <img src="/logo.png" className="logo" alt="react-blogging" />
          <Title>React Blogging</Title>
        </div>

        <div className="footer-left">
          <FooterLeft></FooterLeft>
        </div>
        <div className="footer-right">
          <FooterRight></FooterRight>
        </div>
      </div>
    </FooterStyles>
  )
}

export default Footer
