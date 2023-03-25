import { useController } from 'react-hook-form'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const InputStyles = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? '16px 60px 16px 20px' : '16px 20px')};
    background-color: #dcdcdc;
    border-radius: 8px;
    font-weight: normal;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    outline: none;
    font-size: 15px;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.secondary};
  }
  input::-webkit-input-placeholder {
    color: #808080;
    opacity: 0.6;
    font-weight: 500;
  }
  input::-moz-input-placeholder {
    color: #808080;
  }
  .input-icon {
    position: absolute;
    margin: auto auto;
    right: 20px;
    cursor: pointer;
    color: #808080;
  }
`

const Input = ({
  name = '',
  type = 'text',
  children,
  hasIcon = false,
  control,
  className = '',
  rules,
  ...props
}) => {
  const { field } = useController({
    control,
    rules,
    name,
    defaultValue: '',
  })
  return (
    <InputStyles hasIcon={children ? true : false} className={className}>
      <input autoComplete="off" id={name} type={type} {...field} {...props} />
      {children ? <span className="input-icon">{children}</span> : null}
    </InputStyles>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  hasIcon: PropTypes.bool,
  control: PropTypes.any.isRequired,
}

export default Input
