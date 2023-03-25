import { IconCategory, IconDashboard, IconPost, IconUser } from 'components/icon'
import { PATH } from 'utils/path'

export const MenuData = [
  {
    title: 'Dashboard',
    icon: <IconDashboard></IconDashboard>,
    url: PATH.dashboard.dashboard,
  },
  {
    title: 'Post',
    icon: <IconPost></IconPost>,
    url: PATH.dashboard.posts,
  },
  {
    title: 'Category',
    icon: <IconCategory></IconCategory>,
    url: PATH.dashboard.categories,
  },
  {
    title: 'User',
    icon: <IconUser></IconUser>,
    url: PATH.dashboard.users,
  },
]
