import PropTypes from 'prop-types'

/**
 * @param {*} onClick Handler onClick
 * @requires
 *
 */

const Blur = ({ onClick = () => {} }) => {
  return (
    <div
      className="blur fixed inset-0 bg-gray-600 bg-opacity-70 z-20 transition-opacity duration-300"
      onClick={onClick}
    ></div>
  )
}

Blur.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Blur
