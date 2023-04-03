import { Button } from 'components/button'
import { Content } from 'components/content'
import { Dropdown } from 'components/dropdown'
import { Field } from 'components/field'
import { ImageUpload } from 'components/image'
import { Input } from 'components/input'
import { Label } from 'components/label'
import { db } from '../../firebase/firebase-config'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import useFirebaseImage from 'hooks/useFirebaseImage'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Editor } from 'components/editor'
import { Toggle } from 'components/toggle'
import Radio from 'components/radio'
import { postStatus } from 'utils/constants'
import { toast } from 'react-toastify'
import slugify from 'slugify'
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

const UpdatePost = () => {
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState('')
  const [params] = useSearchParams()
  const postId = params.get('id')
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  })
  const {
    image,
    setImage,
    progress,
    setProgress,
    errorFileType,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues)
  const watchHot = watch('hot')
  const watchStatus = watch('status')
  const imagePost = getValues('image')
  // console.log(imagePost)

  const handleEditor = debounce((e) => {
    setValue('editor', e.target.value)
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

  const handleUpdatePost = async (values) => {
    try {
      if (!isValid) return
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.title, { lower: true })
      cloneValues.status = Number(values.status)
      cloneValues.image = image
      const colRef = doc(db, 'posts', postId)
      // console.log(cloneValues)
      await updateDoc(colRef, {
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
      toast.success(`Update post with id : ${postId} successfully !!!`, {
        pauseOnHover: false,
        delay: 100,
      })
      reset({
        title: '',
        slug: '',
        status: 2,
        categoryId: '',
        category: {},
        user: {},
        hot: false,
        editor: '',
        image: '',
        createdAt: new Date(),
      })
      setImage(image)
      setProgress(0)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('The email address is already in use', {
          pauseOnHover: false,
          delay: 100,
        })
      } else {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    async function getDataFirebase() {
      try {
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
      } catch (error) {
        console.log(error)
      }
    }
    getDataFirebase()
  }, [])

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (!postId) return
        const docRef = doc(db, 'posts', postId)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.data()) {
          reset(docSnapshot.data())
          setSelectCategory(docSnapshot.data()?.category || '')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPostData()
  }, [postId, reset])

  useEffect(() => {
    setImage(imagePost)
  }, [imagePost])

  return (
    <AddPostStyles>
      <Content title="Update Post" desc={`Update your post information id : ${postId}`}></Content>
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
            <Input name="slug" type="text" placeholder="Enter your slug" control={control}></Input>
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
                  value={undefined}
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
                  value={undefined}
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
          <div className="w-full flex flex-col gap-y-2">
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
          </div>
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
          onClick={handleSubmit(handleUpdatePost)}
        >
          Update post
        </Button>
      </form>
    </AddPostStyles>
  )
}

export default UpdatePost
