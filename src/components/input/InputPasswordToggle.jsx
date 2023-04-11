import { useState } from 'react'
import Input from './Input'
import { IconEyeClose, IconEyeOpen } from 'components/icon'
import PropTypes from 'prop-types'

const InputPasswordToggle = ({
  control,
  rules,
  placeholder = 'Enter your password',
  name = 'password',
}) => {
  const [togglePassword, setTogglePassword] = useState(false)

  return (
    <>
      <Input
        type={togglePassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        control={control}
        rules={rules}
      >
        {togglePassword ? (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        ) : (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        )}
      </Input>
    </>
  )
}

InputPasswordToggle.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.any,
}

export default InputPasswordToggle
