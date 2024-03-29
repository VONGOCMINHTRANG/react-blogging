import styled from 'styled-components'
import parse from 'html-react-parser'
import { useDarkTheme } from 'contexts/theme-context'

const PostContentMainStyles = styled.div`
  margin: 40px 0px;
  h1 {
    font-weight: 700;
    margin-bottom: 30px;
    font-size: 20px;
    color: #404040;
  }
  p {
    font-size: 18px;
    line-height: 35px;
  }
`

const PostContentMain = ({ title = '', editor = '' }) => {
  const { darkTheme } = useDarkTheme()

  return (
    <PostContentMainStyles className="entry-content">
      <h1>
        <strong className={darkTheme ? 'text-white' : ''}>{title}</strong>
      </h1>
      <div className={`container-content ${darkTheme ? '!text-white' : ''}`}>{parse(editor)}</div>
    </PostContentMainStyles>
  )
}

export default PostContentMain
