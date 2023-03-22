import { FiArrowLeftCircle } from 'react-icons/fi'
import styled from 'styled-components'

const IconArrowLeftStyles = styled.div`
  color: white;
`
const IconArrowLeft = ({ onClick = () => {}, className = 'close' }) => {
  return (
    <IconArrowLeftStyles onClick={onClick}>
      <FiArrowLeftCircle className={className}></FiArrowLeftCircle>
    </IconArrowLeftStyles>
  )
}

export default IconArrowLeft
