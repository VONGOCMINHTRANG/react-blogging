import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDarkTheme } from 'contexts/theme-context'

const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 800;
  cursor: pointer;
  width: 100%;
`

const Label = ({ children, ...props }) => {
  const { darkTheme } = useDarkTheme()
  return (
    <LabelStyles {...props} className={darkTheme ? '!text-white' : ''}>
      {children}
    </LabelStyles>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Label
