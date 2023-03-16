import styled from 'styled-components'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'

const PostContentMainStyles = styled.div`
  margin: 40px 0px;
  h1 {
    font-weight: 700;
    margin-bottom: 30px;
    font-size: calc(1em + 1vw);
    color: #404040;
  }
`

const PostContentMain = ({ title = '', editor = '' }) => {
  return (
    <PostContentMainStyles className="entry-content">
      <h1>
        <strong>{title}</strong>
      </h1>
      <div className="container-content">{parse(editor)}</div>
    </PostContentMainStyles>
  )
}

PostContentMain.propTypes = {
  title: PropTypes.string.isRequired,
  editor: PropTypes.string.isRequired,
}

export default PostContentMain
