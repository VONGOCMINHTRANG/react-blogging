import { useDropdown } from './dropdown-context'
import PropTypes from 'prop-types'

const List = ({ children }) => {
  const { show } = useDropdown()

  return (
    <>
      <div
        className={`absolute top-full left-0 w-full bg-gray-100 shadow-sm z-30 transition-all duration-150 ${
          show ? 'visible translate-y-2' : 'invisible translate-y-0'
        }`}
      >
        {children}
      </div>
    </>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
}
export default List
