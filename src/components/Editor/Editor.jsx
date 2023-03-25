import { useController } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill'
import axios from 'axios'
import { imgbbAPI } from 'config/apiConfig'
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import ImageUploader from 'quill-image-uploader'
import styled from 'styled-components'
Quill.register('modules/imageUploader', ImageUploader)

/**
 * @param {*} onChange Handler onChange
 * @requires
 * @param {string} type Type of button 'button | 'submit'
 *
 */

const EditorStyles = styled.div`
  .ql-container {
    background-color: #e0e0e0;
  }
`

const Editor = ({ name, value, control, rules, onChange = () => {}, ...props }) => {
  const { field } = useController({
    control,
    name,
    rules,
    defaultValue: '',
  })
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData()
          bodyFormData.append('image', file)
          const response = await axios({
            method: 'post',
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return response.data.data.url
        },
      },
    }),
    []
  )
  return (
    <EditorStyles className="entry-content">
      <ReactQuill
        name={name}
        theme={'snow'}
        value={value}
        modules={modules}
        onChange={onChange}
        {...field}
        {...props}
      />
    </EditorStyles>
  )
}

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default Editor
