import { Button } from 'components/button'
import { Content } from 'components/content'
import { Field } from 'components/field'
import { ImageUpload } from 'components/image'
import { Input, InputPasswordToggle } from 'components/input'
import { Label } from 'components/label'
import Radio from 'components/radio'
import useFirebaseImage from 'hooks/useFirebaseImage'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import styled from 'styled-components'
import { userRole, userStatus } from 'utils/constants'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, db } from '../../firebase/firebase-config'

const AddUserStyles = styled.div`
  margin-bottom: 2.5rem;
  .button {
    width: 200px;
  }

  @media (max-width: 1024px) {
    .form-layout {
      display: flex;
      flex-direction: column;
    }
  }
`

const AddUser = () => {
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
      const cloneValues = { ...values }
      cloneValues.username = slugify(values.username || values.fullname, { lower: true })
      cloneValues.status = Number(values.status)
      cloneValues.role = Number(values.role)
      cloneValues.avatar = image
      console.log(cloneValues)
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
      toast.success(`Create new user with email : ${values.email} successfully !!!`, {
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
        toast.error('The email address is already in use', {
          pauseOnHover: false,
          delay: 100,
        })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <DashboardLayout>
      <AddUserStyles>
        <Content title="New user" desc="Add new user to system"></Content>
        <form>
          <Field>
            <Label htmlFor="avatar">Avatar</Label>
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
                  Please choose avatar for your user
                </div>
              )}
              {errorFileType && (
                <div className="text-red-500 text-sm italic flex justify-center">
                  Please choose avatar has format *.png, *.jpg, *.jpeg, *.avif
                </div>
              )}
            </div>
          </Field>

          <div className="form-layout">
            <Field>
              <Label htmlFor="fullname">Fullname</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <Input
                  control={control}
                  name="fullname"
                  type="text"
                  placeholder="Enter your fullname"
                  rules={{
                    required: true,
                    pattern: /[A-Za-z]/,
                  }}
                ></Input>
                {errors?.fullname?.type === 'required' && (
                  <div className="text-red-500 text-sm italic">Please enter your fullname</div>
                )}
                {errors?.fullname?.type === 'pattern' && (
                  <div className="text-red-500 text-sm italic">Please enter valid fullname</div>
                )}
              </div>
            </Field>
            <Field>
              <Label htmlFor="username">Username</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <Input
                  control={control}
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                ></Input>
              </div>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="email">Email</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <Input
                  control={control}
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  rules={{
                    required: true,
                    pattern: /^\S+@\S+$/,
                  }}
                ></Input>
                {errors?.email?.type === 'required' && (
                  <div className="text-red-500 text-sm italic">Please enter your email</div>
                )}
                {errors?.email?.type === 'pattern' && (
                  <div className="text-red-500 text-sm italic">Please enter valid email</div>
                )}
              </div>
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <div className="flex flex-col gap-y-2 w-full">
                <InputPasswordToggle
                  control={control}
                  rules={{
                    required: true,
                    minLength: 8,
                  }}
                ></InputPasswordToggle>
                {errors?.password?.type === 'required' && (
                  <div className="text-red-500 text-sm italic">Please enter your password</div>
                )}
                {errors?.password?.type === 'minLength' && (
                  <div className="text-red-500 text-sm italic">
                    Your password must be at least 8 characters or greater
                  </div>
                )}
              </div>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label htmlFor="status">Status</Label>
              <div className="flex flex-wrap gap-5">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.ACTIVE}
                  value={userStatus.ACTIVE}
                >
                  Active
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.PENDING}
                  value={userStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.BANNED}
                  value={userStatus.BANNED}
                >
                  Banned
                </Radio>
              </div>
            </Field>
            <Field>
              <Label htmlFor="role">Role</Label>
              <div className="flex flex-wrap gap-5">
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.ADMIN}
                  value={userRole.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.MODERATOR}
                  value={userRole.MODERATOR}
                >
                  Moderator
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.EDITOR}
                  value={userRole.EDITOR}
                >
                  Editor
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.USER}
                  value={userRole.USER}
                >
                  User
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
            Add user
          </Button>
        </form>
      </AddUserStyles>
    </DashboardLayout>
  )
}

export default AddUser
