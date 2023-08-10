import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Field } from 'components/field'
import { ImageUpload } from 'components/image'
import { Input } from 'components/input'
import { Label } from 'components/label'
import { db } from '../../firebase/firebase-config'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import useFirebaseImage from 'hooks/useFirebaseImage'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import styled from 'styled-components'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const AccountInfoStyles = styled.div`
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
  .change-password {
    margin-left: 0;
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

const AccountInfo = () => {
  const { t } = useTranslation()
  const { userInfo } = useAuth()
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
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
      password: '',
      new_password: '',
      createAt: new Date(),
    },
  })
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

  const handleUpdateInformation = async (values) => {
    try {
      if (!isValid) return
      const cloneValues = { ...values }
      cloneValues.username = slugify(values.username || values.fullname, { lower: true })
      cloneValues.status = Number(values.status)
      cloneValues.role = Number(values.role)
      cloneValues.avatar = image
      const colRef = doc(db, 'users', userId)
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      })
      toast.success(
        `${t(`Update account information with email`)}: ${values.email} ${t(`success`)}`,
        {
          pauseOnHover: false,
          delay: 100,
        }
      )
      setImage(image)
      setProgress(0)
      navigate('/')
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
    const fetchUserData = async () => {
      const q = query(collection(db, 'users'), where('email', '==', userInfo?.email))
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUserId(doc.id)
          reset(doc.data())
        })
      })
    }
    fetchUserData()
  }, [userInfo?.email])

  if (!userInfo) return <NotFoundPage></NotFoundPage>
  return (
    <AccountInfoStyles>
      <div className="flex gap-x-5">
        <Content
          title={t('Account Information')}
          desc={`${t(`Update account information with email`)}: ${userInfo.email}`}
        ></Content>
      </div>

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

        <Button
          type="submit"
          onClick={handleSubmit(handleUpdateInformation)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t(`Update user`)}
        </Button>
      </form>
    </AccountInfoStyles>
  )
}

export default AccountInfo
