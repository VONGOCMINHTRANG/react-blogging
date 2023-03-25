import { useDropdown } from './dropdown-context'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

const Select = ({ value, name, control, rules, placeholder = '' }) => {
  const { toggle, show } = useDropdown()
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  })

  return (
    <div
      className="flex items-center justify-between p-5 bg-[#DCDCDC] rounded cursor-pointer font-medium"
      control={control}
      value={value}
      {...field}
      onClick={toggle}
    >
      <span>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node,
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
}

export default Select
