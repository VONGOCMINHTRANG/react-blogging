import { Button } from 'components/button'
import { Field } from 'components/field'
import { Input, InputPasswordToggle } from 'components/input'
import { Label } from 'components/label'
import { Link } from 'components/link'
import { useAuth } from 'contexts/auth-context'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import { PATH } from 'utils/path'
import { useTranslation } from 'react-i18next'

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater')
    .required('Please enter your password'),
})

const SignInPage = () => {
  const { t } = useTranslation()
  const { userInfo, setUserInfo } = useAuth()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleSignIn = async (values) => {
    if (!isValid) return

    try {
      const creditials = await signInWithEmailAndPassword(auth, values.email, values.password)
      setUserInfo(creditials)
      toast.success(t('Login successfully'), {
        pauseOnHover: false,
        delay: 100,
      })
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error(t('Your email is not registered'), {
          pauseOnHover: false,
          delay: 100,
        })
      }
      if (error.code === 'auth/wrong-password') {
        toast.error(t('Your password is not correct'), {
          pauseOnHover: false,
          delay: 100,
        })
      }
    }
  }

  if (localStorage.getItem('userToken') || localStorage.getItem('userInfo')) {
    navigate('/')
  }

  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(t(arrErrors[0].message), {
        pauseOnHover: false,
        delay: 100,
      })
    }
  }, [errors])

  return (
    <AuthenticationPage>
      <form className="max-w-[600px] my-0 mx-auto">
        <Field>
          <Label htmlFor="email">{t(`Email address`)}</Label>
          <Input
            type="email"
            placeholder={t('Enter your email address')}
            name="email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">{t(`Password`)}</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button type="submit" className="w-[200px]" onClick={handleSubmit(handleSignIn)}>
          {t(`Sign In`)}
        </Button>
        <Link link={PATH.sign_up} name={t('Sign up here')}>
          {t(`Not a member?`)}
        </Link>
      </form>
    </AuthenticationPage>
  )
}

export default SignInPage
