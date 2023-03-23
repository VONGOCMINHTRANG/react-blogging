import { FiArrowRightCircle } from 'react-icons/fi'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/**
 * @param {*} onClick Handler onClick
 *
 */

const IconArrowRightStyles = styled.div`
  color: ${(props) => props.theme.secondary};
`
const IconArrowRight = ({ onClick = () => {}, className = '' }) => {
  return (
    <IconArrowRightStyles onClick={onClick}>
      <FiArrowRightCircle className={className}></FiArrowRightCircle>
    </IconArrowRightStyles>
  )
}

IconArrowRight.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default IconArrowRight
