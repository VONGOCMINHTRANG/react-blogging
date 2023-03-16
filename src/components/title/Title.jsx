import styled from 'styled-components'
import PropTypes from 'prop-types'

const TitleStyles = styled.h2`
  color: ${(props) => props.theme.text.title};
  font-size: 28px;
  position: relative;
  margin-bottom: 30px;
  border-top: 3px rgb(94, 191, 247) solid;
  font-weight: bold;
  width: fit-content;
`

const Title = ({ children }) => {
  return <TitleStyles className="title">{children}</TitleStyles>
}

Title.propTypes = {
  chidren: PropTypes.node.isRequired,
}

export default Title
