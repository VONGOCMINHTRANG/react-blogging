import { useAuth } from 'contexts/auth-context'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'utils/path'
import useLogout from 'hooks/useLogout'

const MenuUser = ({ className = '' }) => {
  const navigate = useNavigate()
  const { userInfo } = useAuth()
  const { handleLogout } = useLogout()

  return (
    <ul
      className={`menu-user z-10 absolute whitespace-nowrap right-0 text-sm transition-all rounded bg-slate-600 text-white ${className}`}
    >
      {userInfo.email ? (
        <>
          <li
            onClick={() => navigate(`/manage/account-information/${userInfo.username}`)}
            className="p-2 hover:bg-slate-300 hover:text-green-600"
          >
            Account Information
          </li>
          <li
            onClick={() => navigate(`/manage/change-password/${userInfo.username}`)}
            className="p-2 hover:bg-slate-300 hover:text-green-600"
          >
            Change password
          </li>
          <li onClick={handleLogout} className="p-2 hover:bg-slate-300 hover:text-green-600">
            Log out
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => navigate(PATH.sign_in)}
            className="p-2 hover:bg-slate-300 hover:text-green-600"
          >
            Login
          </li>
          <li
            onClick={() => navigate(PATH.sign_up)}
            className="p-2 hover:bg-slate-300 hover:text-green-600"
          >
            Sign up
          </li>
        </>
      )}
    </ul>
  )
}

export default MenuUser
