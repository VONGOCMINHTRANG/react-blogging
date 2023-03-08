import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import slugify from 'slugify'
import { toast } from 'react-toastify'

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
const CategoryUpdate = () => {
  const [loading, setLoading] = useState(false)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  })
  const watchStatus = watch('status')
  const categoryId = params.get('id')

  const handleUpdateCategory = async (values) => {
    if (!isValid) return
    try {
      const colRef = doc(db, 'categories', categoryId)
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      })
      toast.success('Update category successfully')
      setLoading(true)
      navigate('/manage/category')
    } catch (error) {
      setLoading(false)
      toast.error('Something wrong!', {
        pauseOnHover: false,
        delay: 100,
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchCategoryData = async () => {
      const colRef = doc(db, 'categories', categoryId)
      const singleDoc = await getDoc(colRef)
      reset(singleDoc.data())
    }
    fetchCategoryData()
  }, [categoryId])

  if (!categoryId) return null
  return (
    <DashboardLayout>
      <AddCategoryStyles>
        <Content title="Update category" desc={`Update your category id : ${categoryId}`}></Content>
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
              <Input
                control={control}
                name="slug"
                type="text"
                placeholder="Enter your slug"
              ></Input>
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
            onClick={handleSubmit(handleUpdateCategory)}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update category
          </Button>
        </form>
      </AddCategoryStyles>
    </DashboardLayout>
  )
}

export default CategoryUpdate
