import { IconLogout } from 'components/icon'
import useLogout from 'hooks/useLogout'
import { useTranslation } from 'react-i18next'

const Logout = () => {
  const { t } = useTranslation()
  const { handleLogout } = useLogout()

  return (
    <div className="flex justify-end px-5 items-center">
      <div
        onClick={handleLogout}
        className="bg-red-500 gap-x-2 flex p-2 rounded-md cursor-pointer text-white"
      >
        <IconLogout></IconLogout>
        <span>{t(`Log out`)}</span>
      </div>
    </div>
  )
}

export default Logout
