import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { useState } from 'react'

export default function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [errorFileType, setErrorFileType] = useState('')
  if (!setValue || !getValues) return

  const handleUploadImage = (file) => {
    const storage = getStorage()
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progressPercent)
        // console.log('Upload is ' + progressPercent + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            console.log('Nothing at all')
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setImage(downloadURL)
        })
      }
    )
  }

  const handleSelectImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.name.match(/\.(jpg|jpeg|png|avif)$/)) {
      setErrorFileType(true)
      return
    }
    setErrorFileType(false)
    setValue('image_name', file.name)
    handleUploadImage(file)
  }

  const handleDeleteImage = () => {
    const storage = getStorage()
    const imageRef = ref(storage, 'images/' + getValues('image_name'))

    deleteObject(imageRef)
      .then(() => {
        console.log('Remove image successfully')
        setImage('')
        setProgress(0)
      })
      .catch((error) => {
        console.log('Can not delete image')
      })
  }

  return {
    image,
    setImage,
    errorFileType,
    progress,
    setProgress,
    handleSelectImage,
    handleUploadImage,
    handleDeleteImage,
  }
}
