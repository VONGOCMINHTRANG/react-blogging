import styled from 'styled-components'

const SpinnerStyles = styled.div`
  width: ${(props) => props.width || '30px'};
  height: ${(props) => props.height || '30px'};
  border: ${(props) => props.border || '5px solid white'};
  border-top: 5px solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingSpinner = ({ className = '', ...props }) => {
  return <SpinnerStyles className={className} {...props}></SpinnerStyles>
}

export default LoadingSpinner
