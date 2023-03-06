import {
  IconBlog,
  IconCategory,
  IconContact,
  IconDashboard,
  IconHome,
  IconLogout,
  IconPost,
  IconUser,
} from 'components/icon'

export const SidebarData = [
  {
    url: '/',
    title: 'Home',
    icon: <IconHome></IconHome>,
  },
  {
    url: '/blog',
    title: 'Blog',
    icon: <IconBlog></IconBlog>,
  },
  {
    url: '/contact',
    title: 'Contact',
    icon: <IconContact></IconContact>,
  },
  {
    url: '/dashboard',
    title: 'Dashboard',
    icon: <IconDashboard></IconDashboard>,
  },
  {
    url: '/manage/post',
    title: 'Post',
    icon: <IconPost></IconPost>,
  },
  {
    url: '/manage/category',
    title: 'Category',
    icon: <IconCategory></IconCategory>,
  },
  {
    url: '/manage/user',
    title: 'User',
    icon: <IconUser></IconUser>,
  },
  {
    title: 'Logout',
    icon: <IconLogout></IconLogout>,
  },
]
