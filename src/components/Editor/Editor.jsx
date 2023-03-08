import { useController } from 'react-hook-form'
import styled from 'styled-components'
import ReactQuill from 'react-quill'

const EditorStyles = styled.div`
  font-size: 20px;
  width: 100%;
  .quill {
    position: relative;
  }
  .ql {
    &-editor {
      font-size: 18px;
      p {
        line-height: 2;
        margin-bottom: 20px;
      }
    }
  }
`

const Editor = ({ name, control, rules, onChange = () => {}, ...props }) => {
  const { field } = useController({
    control,
    name,
    rules,
    defaultValue: '',
  })
  return (
    <EditorStyles className="entry-content">
      <ReactQuill name={name} theme={'snow'} onChange={onChange} {...field} {...props} />
    </EditorStyles>
  )
}

export default Editor
