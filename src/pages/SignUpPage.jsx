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
        photoURL:
          'https://images.unsplash.com/photo-1614281325348-7423b62aeb7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1biUyMGZsb3dlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      })
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        avatar:
          'https://images.unsplash.com/photo-1614281325348-7423b62aeb7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1biUyMGZsb3dlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      })
      //   await addDoc(colRef, {
      //     fullname: values.fullname,
      //     email: values.email,
      //     password: values.password,
      //   })
      toast.success('Register successfully !!!', {
        pauseOnHover: false,
        delay: 100,
      })
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        toast.error('The email address is already in use', {
          pauseOnHover: false,
          delay: 100,
        })
    }
  }

  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message, {
        pauseOnHover: false,
        delay: 100,
      })
    }
  }, [errors])

  return (
    <AuthenticationPage>
      <form className="max-w-[600px] my-0 mx-auto">
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input type="text" placeholder="Enter your fullname" name="fullname" control={control} />
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            placeholder="Enter your email address"
            name="email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button
          type="submit"
          className="w-[200px]"
          onClick={handleSubmit(handleSignUp)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <Link link="/sign-in" name="Login">
          Already a member?
        </Link>
      </form>
    </AuthenticationPage>
  )
}

export default SignUpPage
