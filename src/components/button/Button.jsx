import { LoadingSpinner } from 'components/loading'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonStyles = styled.div`
  cursor: pointer;
  padding: calc(0.7em + 0.5vw);
  height: ${(props) => props.height || '56px'};
  line-height: 1;
  color: ${(props) => props.color || 'white'};
  border-radius: calc(0.1em + 0.4vw);
  font-weight: bold;
  font-size: 16px;
  margin: auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || props.theme.secondary};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  pointer-events: ${(props) => (props.disabled ? 'none' : null)};
`

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button | 'submit'
 *
 */

const Button = ({ type = 'button', onClick = () => {}, children, ...props }) => {
  const { isLoading } = props
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children
  return (
    <ButtonStyles className="button" type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button
