import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { Toggle } from 'components/toggle'
import Radio from 'components/radio'
import { Button } from 'components/button'
import slugify from 'slugify'
import { postStatus } from 'utils/constants'
import { ImageUpload } from 'components/image'
import useFirebaseImage from 'hooks/useFirebaseImage'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { Dropdown } from 'components/dropdown'
import { Content } from 'components/content'
import { useAuth } from 'contexts/auth-context'
import { toast } from 'react-toastify'
import { Editor } from 'components/Editor'

const AddPostStyles = styled.div`
  .image-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    pointer-events: none;
  }
  .button {
    padding: calc(0.7em + 0.5vw);
    width: 200px;
  }
  @media (max-width: 767px) {
    .form-layout {
      display: flex;
      flex-direction: column;
    }
  }
`

const AddPost = () => {
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const { userInfo } = useAuth()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      image: '',
      categoryId: '',
      hot: false,
    },
  })
  const {
    image,
    setImage,
    errorFileType,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues)
  const watchStatus = watch('status')
  const watchHot = watch('hot')

  console.log(errors)

  const handleAddPost = async (values) => {
    try {
      setLoading(true)
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.title, { lower: true })
      cloneValues.status = Number(values.status)
      const colRef = collection(db, 'posts')
      await addDoc(colRef, {
        title: cloneValues.title,
        slug: cloneValues.slug,
        hot: cloneValues.hot,
        status: cloneValues.status,
        categoryId: cloneValues.categoryId,
        image,
        image_name: cloneValues.image_name,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
        // editor: cloneValues.editor,
      })
      toast.success('Create new post successfully', {
        pauseOnHover: false,
        delay: 100,
      })
      reset({
        title: '',
        slug: '',
        status: 2,
        categoryId: '',
        hot: false,
        image: '',
      })
      setImage('')
      setProgress(0)
      setSelectCategory('')
      console.log(cloneValues)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function getDataFirebase() {
      const colRef = collection(db, 'categories')
      const q = query(colRef, where('status', '==', 1))
      const querySnapshot = await getDocs(q)
      let result = []
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data())
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategories(result)
    }
    getDataFirebase()
  }, [])

  const handleClickOption = (item) => {
    setValue('categoryId', item.id)
    setSelectCategory(item)
  }

  const handleEditor = (editorState) => {
    setValue('editor', editorState)
  }

  return (
    <DashboardLayout>
      <AddPostStyles>
        <Content title="Add post" desc="Add new post"></Content>
        <form>
          <div className="form-layout">
            <Field>
              <Label htmlFor="title">Title</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter your title"
                  control={control}
                  rules={{
                    required: true,
                  }}
                ></Input>
                {errors?.title?.type === 'required' && (
                  <div className="text-red-500 text-sm italic">Please enter your title</div>
                )}
              </div>
            </Field>

            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                name="slug"
                type="text"
                placeholder="Enter your slug"
                control={control}
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="image">Image</Label>
              <div className="w-full flex flex-col gap-y-2">
                {progress === 0 ? (
                  <ImageUpload
                    onChange={handleSelectImage}
                    progress={progress}
                    name="image"
                    image={image}
                    handleDeleteImage={handleDeleteImage}
                    control={control}
                    rules={{
                      required: true,
                      pattern: [`/\.(jpg|jpeg|png|gif)$/`],
                    }}
                  ></ImageUpload>
                ) : (
                  <ImageUpload
                    onChange={handleSelectImage}
                    progress={progress}
                    name="image"
                    image={image}
                    handleDeleteImage={handleDeleteImage}
                    control={control}
                    rules={{
                      required: false,
                    }}
                  ></ImageUpload>
                )}

                {errors?.image?.type === 'required' && progress === 0 && !errorFileType && (
                  <div className="text-red-500 text-sm italic">
                    Please choose picture for your post
                  </div>
                )}
                {errorFileType && (
                  <div className="text-red-500 text-sm italic">
                    Please choose picture has format *.png, *.jpg, *.jpeg, *.avif
                  </div>
                )}
              </div>
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <Dropdown>
                  {!selectCategory.name && (
                    <>
                      <Dropdown.Select
                        name="dropdown"
                        control={control}
                        rules={{ required: true }}
                        placeholder="Select your category"
                      ></Dropdown.Select>
                      <Dropdown.List>
                        {categories.length > 0 &&
                          categories.map((item) => (
                            <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
                              {item.name}
                            </Dropdown.Option>
                          ))}
                      </Dropdown.List>
                    </>
                  )}

                  {selectCategory.name && (
                    <>
                      <Dropdown.Select
                        name="dropdown"
                        control={control}
                        rules={{ required: false }}
                        placeholder={`${selectCategory.name}`}
                      ></Dropdown.Select>
                      <Dropdown.List>
                        {categories.length > 0 &&
                          categories.map((item) => (
                            <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
                              {item.name}
                            </Dropdown.Option>
                          ))}
                      </Dropdown.List>
                    </>
                  )}
                </Dropdown>
                {errors?.dropdown?.type === 'required' && !selectCategory.name && (
                  <div className="text-red-500 text-sm italic">Please select your category</div>
                )}
              </div>

              {selectCategory?.name && (
                <span className="inline-block p-3 text-sm font-semibold text-green-600 rounded-lg bg-green-300">
                  {selectCategory?.name}
                </span>
              )}
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="content">Content</Label>
              <div className="w-full flex flex-col gap-y-2">
                <Editor
                  onChange={handleEditor}
                  control={control}
                  name="editor"
                  rules={{
                    required: false,
                    minLength: 50,
                  }}
                ></Editor>
                {errors?.editor?.type === 'required' && (
                  <div className="text-red-500 text-sm italic">Please enter your content</div>
                )}
                {errors?.editor?.type === 'minLength' && (
                  <div className="text-red-500 text-sm italic">
                    Your content must be at least 50 characters
                  </div>
                )}
              </div>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="feature-post">Feature post</Label>
              <label>
                <Toggle
                  on={watchHot === true}
                  onClick={() => setValue('hot', !watchHot)}
                  name="hot"
                ></Toggle>
              </label>
            </Field>
            <Field>
              <Label htmlFor="status">Status</Label>
              <div className="flex flex-col lg:flex-row gap-5">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.PENDING}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.REJECT}
                  value={postStatus.REJECT}
                >
                  Reject
                </Radio>
              </div>
            </Field>
          </div>
          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            onClick={handleSubmit(handleAddPost)}
          >
            Add new post
          </Button>
        </form>
      </AddPostStyles>
    </DashboardLayout>
  )
}

export default AddPost
