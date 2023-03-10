import { IconCategory, IconDashboard, IconLogout, IconPost, IconUser } from 'components/icon'

export const MenuData = [
  {
    title: 'Dashboard',
    icon: <IconDashboard></IconDashboard>,
    url: '/dashboard',
  },
  {
    title: 'Post',
    icon: <IconPost></IconPost>,
    url: '/manage/posts',
  },
  {
    title: 'Category',
    icon: <IconCategory></IconCategory>,
    url: '/manage/category',
  },
  {
    title: 'User',
    icon: <IconUser></IconUser>,
    url: '/manage/user',
  },
]
