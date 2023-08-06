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
import { PATH } from 'utils/path'

export const SidebarData = [
  {
    url: PATH.main,
    title: 'Home',
    icon: <IconHome />,
  },
  {
    url: PATH.blog,
    title: 'Blog',
    icon: <IconBlog />,
  },
  {
    url: PATH.dashboard.categories,
    title: 'Category',
    icon: <IconCategory />,
  },
  {
    url: PATH.dashboard.dashboard,
    title: 'Dashboard',
    icon: <IconDashboard />,
  },
  {
    url: '',
    title: 'Account',
    icon: <IconSetting />,
    subMenu: [
      {
        url: PATH.dashboard.account_infomation,
        title: 'User Information',
        icon: <IconRight />,
      },
      {
        url: PATH.dashboard.change_password,
        title: 'Change password',
        icon: <IconRight />,
      },
    ],
  },
  {
    url: PATH.dashboard.posts,
    title: 'Post',
    icon: <IconPost />,
  },

  {
    url: PATH.dashboard.users,
    title: 'User',
    icon: <IconUser />,
  },
  {
    url: PATH.dashboard.add_post,
    title: 'Write new post',
    icon: <IconPencil />,
  },
]
