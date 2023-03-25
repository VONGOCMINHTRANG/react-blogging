import { IconBlog, IconDashboard, IconHome } from 'components/icon'
import { PATH } from 'utils/path'

export const menuLinks = [
  {
    url: PATH.main,
    title: 'Home',
    icon: <IconHome></IconHome>,
  },
  {
    url: PATH.blog,
    title: 'Blog',
    icon: <IconBlog></IconBlog>,
  },
  {
    url: '',
    title: 'Category',
    icon: '',
  },
  {
    url: PATH.dashboard.dashboard,
    title: 'Dashboard',
    icon: <IconDashboard></IconDashboard>,
  },
]
