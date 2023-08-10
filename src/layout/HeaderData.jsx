import { IconBlog, IconDashboard, IconHome } from 'components/icon'
import { useTranslation } from 'react-i18next'
import { PATH } from 'utils/path'

const HeaderData = () => {
  const { t } = useTranslation()
  const menuLinks = [
    {
      url: PATH.main,
      title: t('Home'),
      icon: <IconHome></IconHome>,
    },
    {
      url: PATH.blog,
      title: t('Blog'),
      icon: <IconBlog></IconBlog>,
    },
    {
      url: '',
      title: t('Category'),
      icon: '',
    },
    {
      url: PATH.dashboard.dashboard,
      title: t('Dashboard'),
      icon: <IconDashboard></IconDashboard>,
    },
  ]

  return { menuLinks }
}

export default HeaderData
