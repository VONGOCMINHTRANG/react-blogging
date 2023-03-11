import { IconTrash } from 'components/icon'
import { LoadingSpinner } from 'components/loading'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

const ImageUpload = ({
  control,
  rules,
  name,
  className = '',
  progress = 0,
  image = '',
  handleDeleteImage = () => {},
  ...props
}) => {
  const { field } = useController({
    control,
    rules,
    name,
  })
  return (
    <label
      className={`${className} cursor-pointer flex items-center justify-center border border-dashed w-full h-[200px] rounded-lg shadow-lg relative overflow-hidden group bg-[#E7ECF3]`}
    >
      <input
        name={name}
        type="file"
        className="hidden-input"
        onChange={() => {}}
        {...field}
        {...props}
      ></input>
      {progress !== 0 && !image && (
        <LoadingSpinner
          className="loading-spinner absolute z-10"
          width="60px"
          height="60px"
          border="4px solid rgb(29,192,113)"
        ></LoadingSpinner>
      )}
      {!image && (
        <div className="flex flex-col items-center text-center pointer-event-none ">
          <img src="/upload-img.png" alt="upload-img" className="max-w-[80px] mb-5" />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <>
          <img src={image} className="w-full h-full object-cover" alt="post-img" />
          <button
            type="button"
            className="w-16 h-16 bg-[#E7ECF3] rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500 opacity-0 transition-all invisible group-hover:visible group-hover:opacity-100"
            onClick={handleDeleteImage}
          >
            <IconTrash></IconTrash>
          </button>
        </>
      )}

      {!image && progress === 0 && (
        <div
          className="absolute w-12 h-1 bg-green-500 bottom-0 left-0 transition-all image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  )
}

ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
}

export default ImageUpload
