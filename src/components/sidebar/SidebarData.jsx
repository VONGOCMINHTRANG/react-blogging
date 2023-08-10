import {
  IconBlog,
  IconCategory,
  IconDashboard,
  IconHome,
  IconPencil,
  IconPost,
  IconRight,
  IconSetting,
  IconUser,
} from 'components/icon'
import { useTranslation } from 'react-i18next'
import { PATH } from 'utils/path'

const SidebarData = () => {
  const { t } = useTranslation()
  const menuSidebar = [
    {
      url: PATH.main,
      title: t('Home'),
      icon: <IconHome />,
    },
    {
      url: PATH.blog,
      title: t('Blog'),
      icon: <IconBlog />,
    },
    {
      url: PATH.dashboard.categories,
      title: t('Category'),
      icon: <IconCategory />,
    },
    {
      url: PATH.dashboard.dashboard,
      title: t('Dashboard'),
      icon: <IconDashboard />,
    },
    {
      url: '#',
      title: t('Account'),
      icon: <IconSetting />,
      subMenu: [
        {
          url: PATH.dashboard.account_infomation,
          title: t('User Information'),
        },
        {
          url: PATH.dashboard.change_password,
          title: t('Change password'),
        },
      ],
    },
    {
      url: PATH.dashboard.posts,
      title: t('Post'),
      icon: <IconPost />,
    },

    {
      url: PATH.dashboard.users,
      title: t('User'),
      icon: <IconUser />,
    },
    {
      url: PATH.dashboard.add_post,
      title: t('Write new post'),
      icon: <IconPencil />,
    },
  ]

  return { menuSidebar }
}

export default SidebarData
