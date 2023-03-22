import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import { useAuth } from 'contexts/auth-context'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import NotFoundPage from 'pages/NotFoundPage'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'
import { db } from '../../firebase/firebase-config'

const AddCategoryStyles = styled.div`
  .button {
    width: 200px;
  }

  @media (max-width: 767px) {
    .form-layout {
      display: flex;
      flex-direction: column;
    }
  }
`

const AddCategory = () => {
  const { userInfo } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      status: 1,
      createdAt: new Date(),
    },
  })
  const watchStatus = watch('status')

  const handleAddCategory = async (values) => {
    if (!isValid) return
    try {
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.name, { lower: true })
      cloneValues.status = Number(values.status)
      const colRef = collection(db, 'categories')
      await addDoc(colRef, {
        // ...cloneValues,
        name: cloneValues.name,
        slug: cloneValues.slug,
        status: cloneValues.status,
        createdAt: serverTimestamp(),
      })
      // console.log(cloneValues)
      toast.success('Create new category successfully', {
        pauseOnHover: false,
        delay: 100,
      })
      reset({
        name: '',
        slug: '',
        status: 1,
        createdAt: new Date(),
      })
    } catch (error) {
      console.log(error)
      toast.error('Something wrong!', {
        pauseOnHover: false,
        delay: 100,
      })
    }
  }

  if (!userInfo) return <NotFoundPage></NotFoundPage>

  return (
    <AddCategoryStyles>
      <Content title="New category" desc="Add new category"></Content>
      <form>
        <div className="form-layout">
          <Field>
            <Label htmlFor="name">Name</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="name"
                type="text"
                placeholder="Enter your category name"
                rules={{
                  required: true,
                }}
              ></Input>
              {errors?.name?.type === 'required' && (
                <div className="text-red-500 text-sm italic">Please enter your category name</div>
              )}
            </div>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input control={control} name="slug" type="text" placeholder="Enter your slug"></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-wrap gap-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit(handleAddCategory)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add category
        </Button>
      </form>
    </AddCategoryStyles>
  )
}

export default AddCategory
