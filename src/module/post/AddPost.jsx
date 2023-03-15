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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { Dropdown } from 'components/dropdown'
import { Content } from 'components/content'
import { useAuth } from 'contexts/auth-context'
import { toast } from 'react-toastify'
import { Editor } from 'components/Editor'
import { debounce } from 'lodash'

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
    margin-bottom: 2.5rem;
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
  const [content, setContent] = useState('')
  const { userInfo } = useAuth()
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
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
      category: {},
      user: {},
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
  const handleEditor = debounce((contentState) => {
    setContent('editor', contentState)
  }, 1000)

  const handleClickOption = async (item) => {
    // setValue('categoryId', item.id)
    const colRef = doc(db, 'categories', item.id)
    const docData = await getDoc(colRef)
    setValue('category', {
      id: docData.id,
      ...docData.data(),
    })
    setSelectCategory(item)
  }

  const handleAddPost = async (values) => {
    try {
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.title, { lower: true })
      cloneValues.status = Number(values.status)
      // console.log(cloneValues)
      const colRef = collection(db, 'posts')
      await addDoc(colRef, {
        title: cloneValues.title,
        slug: cloneValues.slug,
        image,
        image_name: cloneValues.image_name,
        hot: cloneValues.hot,
        status: cloneValues.status,
        categoryId: cloneValues.category.id,
        category: cloneValues.category,
        userId: cloneValues.user.id,
        user: cloneValues.user,
        createdAt: serverTimestamp(),
        editor: cloneValues.editor,
      })
      toast.success('Create new post successfully', {
        pauseOnHover: false,
        delay: 100,
      })
      reset({
        title: '',
        slug: '',
        status: 2,
        category: {},
        user: {},
        hot: false,
        image: '',
        content: '',
        createdAt: new Date(),
      })
      setImage('')
      setProgress(0)
      setSelectCategory('')
      // console.log(cloneValues)
    } catch (error) {
      console.log(error)
      toast.error('Something wrong!', {
        pauseOnHover: false,
        delay: 100,
      })
    }
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (!userInfo.email) return
        const q = query(collection(db, 'users'), where('email', '==', userInfo.email))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setValue('user', {
            id: doc.id,
            ...doc.data(),
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchCurrentUser()
  }, [userInfo.email])

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
                    className="!h-[250px]"
                    onChange={handleSelectImage}
                    progress={progress}
                    name="image"
                    image={image}
                    handleDeleteImage={handleDeleteImage}
                    control={control}
                    rules={{
                      required: true,
                    }}
                  ></ImageUpload>
                ) : (
                  <ImageUpload
                    className="!h-[250px]"
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
          <Field>
            <Label htmlFor="content">Content</Label>
            <Editor
              onChange={handleEditor}
              control={control}
              name="editor"
              rules={{
                required: true,
                minLength: 10,
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
          </Field>
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
            isLoading={isSubmitting}
            disabled={isSubmitting}
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
