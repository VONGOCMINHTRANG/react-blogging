import { useController } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill'
import axios from 'axios'
import { imgbbAPI } from 'config/apiConfig'
import { useMemo } from 'react'
import ImageUploader from 'quill-image-uploader'
Quill.register('modules/imageUploader', ImageUploader)

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
    <div className="entry-content">
      <ReactQuill
        name={name}
        theme={'snow'}
        value={value}
        modules={modules}
        onChange={onChange}
        {...field}
        {...props}
      />
    </div>
  )
}

export default Editor
