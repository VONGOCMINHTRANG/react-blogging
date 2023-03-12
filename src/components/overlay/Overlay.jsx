import styled from 'styled-components'

const OverlayStyles = styled.div`
  position: absolute;
  inset: 0px;
  border-radius: ${(props) => props.borderRadius || '10px'};
  background: linear-gradient(
    179.77deg,
    rgb(107, 107, 107) 99.45%,
    rgba(163, 163, 163, 0.624) 69.98%
  );
  mix-blend-mode: multiply;
  opacity: 0.6;
`

const Overlay = ({ className = 'overlay' }) => {
  return <OverlayStyles className={className}></OverlayStyles>
}

export default Overlay
