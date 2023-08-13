import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

/**
 * @param {*} onClick Handler onClick
 * @requires
 *
 */

const Blur = ({ onClick = () => {} }) => {
  return createPortal(
    <div
      className="blur fixed inset-0 bg-gray-600 bg-opacity-50 z-20 transition-opacity duration-300"
      onClick={onClick}
    ></div>,
    document.querySelector('body')
  )
}

Blur.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Blur
