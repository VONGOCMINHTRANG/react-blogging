import styled from 'styled-components'

const BlurStyles = styled.div`
  @media (min-width: 951px) {
    display: none;
  }
`

const Blur = ({ onClick = () => {} }) => {
  return (
    <BlurStyles>
      <div
        className="fixed inset-0 bg-slate-600 bg-opacity-70 z-20 transition-opacity duration-300"
        onClick={onClick}
      ></div>
    </BlurStyles>
  )
}

export default Blur
