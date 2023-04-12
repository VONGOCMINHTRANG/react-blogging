import { IconLogout } from 'components/icon'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from '../../firebase/firebase-config'

const Logout = () => {
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
        navigate(0)
      }
    })
  }

  return (
    <div className="flex justify-end px-5 items-center">
      <div
        onClick={handleLogout}
        className="bg-red-500 gap-x-2 flex p-2 rounded-md cursor-pointer text-white"
      >
        <IconLogout></IconLogout>
        <span>Logout</span>
      </div>
    </div>
  )
}

export default Logout
