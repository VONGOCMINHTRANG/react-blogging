import { useDarkTheme } from 'contexts/theme-context'
import { BiMenu } from 'react-icons/bi'

const IconMenu = () => {
  const { darkTheme } = useDarkTheme()
  return <BiMenu className={darkTheme ? 'text-white' : ''}></BiMenu>
}

export default IconMenu
