import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'

const AddCategoryStyles = styled.div`
  /* .hidden-input {
    opacity: 0;
  } */
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
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      status: 1,
    },
  })

  const handleAddCategory = async (values) => {
    const cloneValues = { ...values }
    cloneValues.slug = slugify(values.slug || values.name)
    cloneValues.status = Number(values.status)
    console.log(cloneValues)
  }
  const watchStatus = watch('status')
  return (
    <DashboardLayout>
      <AddCategoryStyles>
        <Content title="New category" desc="Add new category"></Content>
        <form>
          <div className="form-layout">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                control={control}
                name="name"
                type="text"
                placeholder="Enter your category name"
              ></Input>
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
            onClick={handleSubmit(handleAddCategory)}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Add category
          </Button>
        </form>
      </AddCategoryStyles>
    </DashboardLayout>
  )
}

export default AddCategory
