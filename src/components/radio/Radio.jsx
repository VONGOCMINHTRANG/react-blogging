import { IconCheck } from 'components/icon'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useDarkTheme } from 'contexts/theme-context'

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { darkTheme } = useDarkTheme()
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  })

  return (
    <label>
      <input
        type="radio"
        className="hidden-input"
        onChange={(e) => field.onChange(e.target.value)}
        checked={checked}
        {...field}
        {...rest}
      ></input>
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center p-1 
          ${checked ? 'bg-green-500 text-white' : 'bg-[#C0C0C0] text-transparent'}`}
        >
          <IconCheck></IconCheck>
        </div>
        <span className={darkTheme ? ' text-white' : ''}>{children}</span>
      </div>
    </label>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  control: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

export default Radio
