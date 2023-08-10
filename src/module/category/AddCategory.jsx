import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'
import { db } from '../../firebase/firebase-config'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
      toast.success(t('Create new category successfully'), {
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
      toast.error(t('Something wrong!'), {
        pauseOnHover: false,
        delay: 100,
      })
    }
  }

  return (
    <AddCategoryStyles>
      <Content title={t('New category')} desc={t('Add new category')}></Content>
      <form>
        <div className="form-layout">
          <Field>
            <Label htmlFor="name">{t(`Name`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="name"
                type="text"
                placeholder={t('Enter your category name')}
                rules={{
                  required: true,
                }}
              ></Input>
              {errors?.name?.type === 'required' && (
                <div className="text-red-500 text-sm italic">
                  {t(`Please enter your category name`)}
                </div>
              )}
            </div>
          </Field>
          <Field>
            <Label htmlFor="slug">{t(`Slug`)}</Label>
            <Input
              control={control}
              name="slug"
              type="text"
              placeholder={t('Enter your slug')}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="status">{t(`Status`)}</Label>
            <div className="flex flex-wrap gap-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                {t(`Approved`)}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                {t(`Unapproved`)}
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
          {t(`Add category`)}
        </Button>
      </form>
    </AddCategoryStyles>
  )
}

export default AddCategory
