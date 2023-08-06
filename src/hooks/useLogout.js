import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from '../firebase/firebase-config'

const useLogout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(29, 192, 113)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Login successfully', '', 'success')
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
