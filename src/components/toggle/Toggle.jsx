import PropTypes from 'prop-types'

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {bool} on Value of on 'true | 'false'
 *
 */

const Toggle = ({ on, onClick = () => {}, name = '', ...props }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onChange={() => {}}
        onClick={onClick}
        name={name}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? 'bg-green-500' : 'bg-gray-300'
        } `}
        {...props}
      >
        <span
          className={`transition-all w-[34px] h-[34px] bg-white rounded-full inline-block
      ${on ? 'translate-x-[28px]' : ''}`}
        ></span>
      </div>
    </label>
  )
}

Toggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
}

export default Toggle
