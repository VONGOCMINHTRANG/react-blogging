import { FiArrowLeftCircle } from 'react-icons/fi'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/**
 * @param {*} onClick Handler onClick
 *
 */

const IconArrowLeftStyles = styled.div`
  color: white;
`
const IconArrowLeft = ({ onClick = () => {}, className = 'close' }) => {
  return (
    <IconArrowLeftStyles onClick={onClick}>
      <FiArrowLeftCircle className={className}></FiArrowLeftCircle>
    </IconArrowLeftStyles>
  )
}

IconArrowLeft.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default IconArrowLeft
