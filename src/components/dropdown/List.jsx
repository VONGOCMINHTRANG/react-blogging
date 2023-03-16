import { useDropdown } from './dropdown-context'
import PropTypes from 'prop-types'

const List = ({ children }) => {
  const { show } = useDropdown()

  return (
    <>
      {show && (
        <div className="absolute top-full mt-1 left-0 w-full bg-gray-100 shadow-sm">{children}</div>
      )}
    </>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
}
export default List
