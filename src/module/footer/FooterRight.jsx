import styled from 'styled-components'
import { FaFacebookSquare, FaInstagram, FaPinterestSquare, FaTwitterSquare } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const FooterRightStyles = styled.div`
  p {
    font-size: min(0.9em, 3vw);
    font-weight: 500;
    color: rgb(156 163 175 / var(--tw-bg-opacity));
    line-height: min(28px, 4vw);
    margin-bottom: 1.75rem;
  }
  .social-media {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
`

const FooterRight = () => {
  return (
    <FooterRightStyles className="footer-right">
      <p>
        Welcome to React Blogging.
        <br />
        You can post your blogs, write your feeling and sharing interesting things with other
        people.
      </p>
      <div className="social-media">
        <Link to="/#">
          <FaFacebookSquare className="h-8 w-8 text-black/40"></FaFacebookSquare>
        </Link>
        <Link to="/#">
          <FaInstagram className="h-8 w-8 text-black/40"></FaInstagram>
        </Link>
        <Link to="/#">
          <BsLinkedin className="h-8 w-8 text-black/40"></BsLinkedin>
        </Link>
        <Link to="/#">
          <FaPinterestSquare className="h-8 w-8 text-black/40"></FaPinterestSquare>
        </Link>
        <Link to="/#">
          <FaTwitterSquare className="h-8 w-8 text-black/40"></FaTwitterSquare>
        </Link>
      </div>
    </FooterRightStyles>
  )
}

export default FooterRight
