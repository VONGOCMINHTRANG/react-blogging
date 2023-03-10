import { useState } from 'react'
import Input from './Input'
import { IconEyeClose, IconEyeOpen } from 'components/icon'

const InputPasswordToggle = ({ control, rules }) => {
  const [togglePassword, setTogglePassword] = useState(false)
  return (
    <>
      <Input
        type={togglePassword ? 'text' : 'password'}
        placeholder="Enter your password"
        name="password"
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

export default InputPasswordToggle
