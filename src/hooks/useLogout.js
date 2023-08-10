import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from '../firebase/firebase-config'
import { useTranslation } from 'react-i18next'

const useLogout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: t('Are you sure?'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(29, 192, 113)',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, log out!'),
      cancelButtonText: t('Cancel'),
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(t('Login successfully'), '', 'success')
        signOut(auth)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        navigate(0)
      }
    })
  }
  return { handleLogout }
}

export default useLogout
