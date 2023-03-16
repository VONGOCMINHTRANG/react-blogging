import styled from 'styled-components'
import PropTypes from 'prop-types'

const BlurStyles = styled.div`
  @media (min-width: 951px) {
    display: none;
  }
`
/**
 * @param {*} onClick Handler onClick
 * @requires
 *
 */

const Blur = ({ onClick = () => {} }) => {
  return (
    <BlurStyles>
      <div
        className="fixed inset-0 bg-slate-600 bg-opacity-70 z-20 transition-opacity duration-300"
        onClick={onClick}
      ></div>
    </BlurStyles>
  )
}

Blur.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Blur
