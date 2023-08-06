import { IconLogout } from 'components/icon'
import useLogout from 'hooks/useLogout'

const Logout = () => {
  const { handleLogout } = useLogout()

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
