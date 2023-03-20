import {
  IconBlog,
  IconCategory,
  IconDashboard,
  IconHome,
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
    url: '/manage/category',
    title: 'Category',
    icon: <IconCategory></IconCategory>,
  },
  {
    url: '/dashboard',
    title: 'Dashboard',
    icon: <IconDashboard></IconDashboard>,
  },
  {
    url: '/manage/posts',
    title: 'Post',
    icon: <IconPost></IconPost>,
  },

  {
    url: '/manage/user',
    title: 'User',
    icon: <IconUser></IconUser>,
  },
]
