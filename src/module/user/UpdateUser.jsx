import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { ImageUpload } from 'components/image'
import { Input } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import { db } from '../../firebase/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import useFirebaseImage from 'hooks/useFirebaseImage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import styled from 'styled-components'
import { userRole, userStatus } from 'utils/constants'
import { useTranslation } from 'react-i18next'

const UpdateUserStyles = styled.div`
  margin-bottom: 2.5rem;
  .hidden-input {
    clip: rect(0 0 0 0);
    border: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .button {
    width: 200px;
  }
  @media (max-width: 540px) {
    .radio-list,
    .role-list {
      flex-direction: column;
    }
  }
  @media (max-width: 1024px) {
    .form-layout {
      display: flex;
      flex-direction: column;
      margin-bottom: 0px;
    }
  }
`

const UpdateUser = () => {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const userId = params.get('id')
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      avatar: '',
      fullname: '',
      username: '',
      dob: '',
      phone: '',
      email: '',
      status: Number(userStatus.PENDING),
      role: Number(userRole.USER),
      createAt: new Date(),
    },
  })
  const watchStatus = watch('status')
  const watchRole = watch('role')
  const imageUrl = getValues('avatar')
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl)
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : ''
  const deleteAvatar = async () => {
    const colRef = doc(db, 'users', userId)
    await updateDoc(colRef, {
      avatar: '',
    })
  }
  const {
    image,
    setImage,
    errorFileType,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar)

  const handleUpdateUser = async (values) => {
    try {
      if (!isValid) return
      const cloneValues = { ...values }
      cloneValues.username = slugify(values.username || values.fullname, {
        lower: true,
        replacement: '',
        trim: true,
      })
      cloneValues.status = Number(values.status)
      cloneValues.role = Number(values.role)
      cloneValues.avatar = image
      const colRef = doc(db, 'users', userId)
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      })
      toast.success(`${t(`Update user with email`)}: ${values.email} ${t(`success`)}`, {
        pauseOnHover: false,
        delay: 100,
      })
      reset({
        avatar: '',
        fullname: '',
        username: '',
        dob: '',
        phone: '',
        email: '',
        status: Number(userStatus.PENDING),
        role: Number(userRole.USER),
        createAt: new Date(),
      })
      setImage(image)
      setProgress(0)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error(t('The email address is already in use'), {
          pauseOnHover: false,
          delay: 100,
        })
      } else {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    setImage(imageUrl)
  }, [imageUrl])

  useEffect(() => {
    if (!userId) return

    const fetchUserData = async () => {
      const colRef = doc(db, 'users', userId)
      const singleDoc = await getDoc(colRef)
      reset(singleDoc.data())
    }
    fetchUserData()
  }, [])
  return (
    <UpdateUserStyles>
      <Content title={t('Update User')} desc={`${t(`Update user id`)}: ${userId}`}></Content>
      <form>
        <Field>
          <Label htmlFor="avatar">{t(`Avatar`)}</Label>
          <div className="w-full flex flex-col gap-y-2 mb-10">
            <div className="w-[200px] mx-auto">
              {progress === 0 ? (
                <ImageUpload
                  className="!rounded-full"
                  onChange={handleSelectImage}
                  progress={progress}
                  name="avatar"
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
                  className="!rounded-full "
                  onChange={handleSelectImage}
                  progress={progress}
                  name="avatar"
                  value={undefined}
                  image={image}
                  handleDeleteImage={handleDeleteImage}
                  control={control}
                  rules={{
                    required: false,
                  }}
                ></ImageUpload>
              )}
            </div>

            {errors?.avatar?.type === 'required' && progress === 0 && !errorFileType && (
              <div className="text-red-500 text-sm italic flex justify-center">
                {t(`Please choose avatar for your user`)}
              </div>
            )}
            {errorFileType && (
              <div className="text-red-500 text-sm italic flex justify-center">
                {t(`Please choose avatar has format`)} *.png, *.jpg, *.jpeg, *.avif
              </div>
            )}
          </div>
        </Field>

        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">{t(`Fullname`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="fullname"
                type="text"
                placeholder={t('Enter your fullname')}
                rules={{
                  required: true,
                  pattern: /[A-Za-z]/,
                }}
              ></Input>
              {errors?.fullname?.type === 'required' && (
                <div className="text-red-500 text-sm italic">{t(`Please enter your fullname`)}</div>
              )}
              {errors?.fullname?.type === 'pattern' && (
                <div className="text-red-500 text-sm italic">
                  {t(`Please enter valid fullname`)}
                </div>
              )}
            </div>
          </Field>
          <Field>
            <Label htmlFor="username">{t(`Username`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="username"
                type="text"
                placeholder={t('Enter your username')}
              ></Input>
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="dob">{t(`Date of birth`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input control={control} name="dob" type="text" placeholder={t('dd/mm/yy')}></Input>
            </div>
          </Field>
          <Field>
            <Label htmlFor="phone">{t(`Mobile number`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="phone"
                type="text"
                placeholder={t('Enter your mobile number')}
              ></Input>
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">{t(`Email`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <Input
                control={control}
                name="email"
                type="text"
                placeholder={t('Enter your email')}
                rules={{
                  required: true,
                  pattern: /^\S+@\S+$/,
                }}
                disabled
              ></Input>
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="status">{t(`Status`)}</Label>
            <div className="radio-list flex flex-wrap gap-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                {t(`Active`)}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                {t(`Pending`)}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BANNED}
                value={userStatus.BANNED}
              >
                {t(`Banned`)}
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="role">{t(`Role`)}</Label>
            <div className="role-list flex flex-wrap gap-5">
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                {t(`Admin`)}
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MODERATOR}
                value={userRole.MODERATOR}
              >
                {t(`Moderator`)}
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.EDITOR}
                value={userRole.EDITOR}
              >
                {t(`Editor`)}
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                {t(`User`)}
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit(handleUpdateUser)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t(`Update user`)}
        </Button>
      </form>
    </UpdateUserStyles>
  )
}

export default UpdateUser
