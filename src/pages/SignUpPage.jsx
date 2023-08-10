import { Label } from 'components/label'
import { Input, InputPasswordToggle } from 'components/input'
import { useForm } from 'react-hook-form'
import { Field } from 'components/field'
import { useEffect } from 'react'
import { Button } from 'components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase/firebase-config'
import { useNavigate } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'components/link'
import AuthenticationPage from './AuthenticationPage'
import slugify from 'slugify'
import { userRole, userStatus } from 'utils/constants'
import defaultAvatar from '../assets/images/default.avif'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'contexts/auth-context'

const schema = yup.object({
  fullname: yup.string().required('Please enter you fullname'),
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater')
    .required('Please enter your password'),
})

const SignUpPage = () => {
  const { t } = useTranslation()
  const { userInfo } = useAuth()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const handleSignUp = async (values) => {
    if (!isValid) return
    // console.log("handleSignUp ~ values", values);

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL: defaultAvatar,
      })
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        avatar: defaultAvatar,
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      })
      //   await addDoc(colRef, {
      //     fullname: values.fullname,
      //     email: values.email,
      //     password: values.password,
      //   })
      toast.success(t('Register successfully'), {
        pauseOnHover: false,
        delay: 100,
      })
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
          <Label htmlFor="fullname">{t(`Fullname`)}</Label>
          <Input
            type="text"
            placeholder={t('Enter your fullname')}
            name="fullname"
            control={control}
          />
        </Field>
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
        <Button
          type="submit"
          className="w-[200px]"
          onClick={handleSubmit(handleSignUp)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t(`Sign Up`)}
        </Button>
        <Link link="/sign-in" name={t('Login')}>
          {t(`Already a member?`)}
        </Link>
      </form>
    </AuthenticationPage>
  )
}

export default SignUpPage
