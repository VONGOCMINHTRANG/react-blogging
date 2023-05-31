export const PATH = {
  main: '/',
  sign_up: '/sign-up',
  sign_in: '/sign-in',
  blog: '/blog',
  search: '/search',
  not_found: '*',

  dashboard: {
    dashboard: '/manage/dashboard',

    // Post Manage
    add_post: '/manage/add-post',
    posts: '/manage/posts',
    update_post: '/manage/update-post',

    // User Manage
    add_user: 'manage/add-user',
    users: '/manage/users',
    update_user: '/manage/update-user',
    account_infomation: '/manage/account-information/:name',
    change_password: '/manage/change-password/:name',

    // Category Manage
    add_category: '/manage/add-category',
    categories: '/manage/category',
    update_category: '/manage/update-category',
  },

  detail_post: '/detail-post/:slug',
  author: '/author/:slug',
  category: '/category/:slug',
}
