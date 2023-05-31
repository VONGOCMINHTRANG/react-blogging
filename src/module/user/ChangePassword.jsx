import { Button } from 'components/button'
import { Content } from 'components/content'
import { Field } from 'components/field'
import { InputPasswordToggle } from 'components/input'
import { Label } from 'components/label'
import { useAuth } from 'contexts/auth-context'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { getAuth, signOut, updatePassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ChangePasswordStyles = styled.div`
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

const ChangePassword = () => {
  const { userInfo } = useAuth()
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      new_password: '',
      confirm: '',
    },
  })
  const navigate = useNavigate()

  const handleUpdatePassword = (values) => {
    if (!isValid) return
    if (values.password !== userInfo?.password) {
      toast.error('Your current password is not correct!', {
        pauseOnHover: false,
        delay: 100,
      })
      return
    }
    if (values.new_password !== values.confirm) {
      toast.error('Please confirm new password again!', {
        pauseOnHover: false,
        delay: 100,
      })
      return
    }
    try {
      const auth = getAuth()
      updatePassword(auth.currentUser, values.new_password)
        .then(() => {
          console.log('success')
          Swal.fire('Your password has been updated!', '', 'success')
          navigate('/')
        })
        .catch((error) => {
          // console.log(error)
          if (error.code == 'auth/requires-recent-login') {
            signOut(auth)
            navigate('/sign-in')
          }
        })
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    }
  }

  return (
    <ChangePasswordStyles>
      <Content
        title="Change Password"
        desc={`Update password of email : ${userInfo?.email}`}
      ></Content>
      <form>
        <Field>
          <Label htmlFor="password">Current password</Label>
          <div className="flex flex-col gap-y-2 w-full">
            <InputPasswordToggle
              placeholder="Enter your current password"
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: 8,
              }}
            ></InputPasswordToggle>
            {errors?.password?.type === 'required' && (
              <div className="text-red-500 text-sm italic">Please enter your current password</div>
            )}
            {errors?.password?.type === 'minLength' && (
              <div className="text-red-500 text-sm italic">
                Your current password must be at least 8 characters or greater
              </div>
            )}
          </div>
        </Field>
        <Field>
          <Label htmlFor="new_password">New password</Label>
          <div className="flex flex-col gap-y-2 w-full">
            <InputPasswordToggle
              control={control}
              name="new_password"
              placeholder="Enter your new password"
              rules={{
                required: true,
                minLength: 8,
              }}
            ></InputPasswordToggle>
            {errors?.new_password?.type === 'required' && (
              <div className="text-red-500 text-sm italic">Please enter your new password</div>
            )}
            {errors?.new_password?.type === 'minLength' && (
              <div className="text-red-500 text-sm italic">
                Your new password must be at least 8 characters or greater
              </div>
            )}
          </div>
        </Field>
        <Field>
          <Label htmlFor="confirm">Confirm new password</Label>
          <div className="flex flex-col gap-y-2 w-full">
            <InputPasswordToggle
              placeholder="Confirm your new password"
              control={control}
              name="confirm"
              rules={{
                required: true,
                minLength: 8,
              }}
            ></InputPasswordToggle>
            {errors?.confirm?.type === 'required' && (
              <div className="text-red-500 text-sm italic">Please confirm your new password</div>
            )}
            {errors?.confirm?.type === 'minLength' && (
              <div className="text-red-500 text-sm italic">
                Confirm your new password must be at least 8 characters or greater
              </div>
            )}
          </div>
        </Field>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={handleSubmit(handleUpdatePassword)}
        >
          Update password
        </Button>
      </form>
    </ChangePasswordStyles>
  )
}

export default ChangePassword
