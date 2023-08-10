import { Button } from 'components/button'
import { Content } from 'components/content'
import { Field } from 'components/field'
import { ImageUpload } from 'components/image'
import { Input, InputPasswordToggle } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import useFirebaseImage from 'hooks/useFirebaseImage'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import styled from 'styled-components'
import { userRole, userStatus } from 'utils/constants'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, db } from '../../firebase/firebase-config'
import { useTranslation } from 'react-i18next'

const AddUserStyles = styled.div`
  margin-bottom: 2.5rem;
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
    }
  }
`

const AddUser = () => {
  const { t } = useTranslation()
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
      email: '',
      password: '',
      status: Number(userStatus.PENDING),
      role: Number(userRole.USER),
      createAt: new Date(),
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
  const watchRole = watch('role')

  const handleAddUser = async (values) => {
    try {
      if (!isValid) return
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      await addDoc(collection(db, 'users'), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: '',
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      })
      toast.success(`${t(`Create new user with email`)}: ${values.email} ${t(`success`)}`, {
        pauseOnHover: false,
        delay: 100,
      })

      reset({
        avatar: '',
        fullname: '',
        username: '',
        email: '',
        password: '',
        status: Number(userStatus.PENDING),
        role: Number(userRole.USER),
        createAt: new Date(),
      })
      setImage('')
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

  return (
    <AddUserStyles>
      <Content title={t('New user')} desc={t('Add new user to system')}></Content>
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
                  image={image}
                  handleDeleteImage={handleDeleteImage}
                  control={control}
                  rules={{
                    required: true,
                    pattern: [`/.(jpg|jpeg|png|gif)$/`],
                  }}
                ></ImageUpload>
              ) : (
                <ImageUpload
                  className="!rounded-full"
                  onChange={handleSelectImage}
                  progress={progress}
                  name="avatar"
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
              ></Input>
              {errors?.email?.type === 'required' && (
                <div className="text-red-500 text-sm italic">{t(`Please enter your email`)}</div>
              )}
              {errors?.email?.type === 'pattern' && (
                <div className="text-red-500 text-sm italic">{t(`Please enter valid email`)}</div>
              )}
            </div>
          </Field>
          <Field>
            <Label htmlFor="password">{t(`Password`)}</Label>
            <div className="flex flex-col gap-y-2 w-full">
              <InputPasswordToggle
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
              ></InputPasswordToggle>
              {errors?.password?.type === 'required' && (
                <div className="text-red-500 text-sm italic">{t(`Please enter your password`)}</div>
              )}
              {errors?.password?.type === 'minLength' && (
                <div className="text-red-500 text-sm italic">
                  {t(`Your password must be at least 8 characters or greater`)}
                </div>
              )}
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
          onClick={handleSubmit(handleAddUser)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t(`Add user`)}
        </Button>
      </form>
    </AddUserStyles>
  )
}

export default AddUser
