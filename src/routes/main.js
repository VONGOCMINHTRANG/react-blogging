import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../contexts/auth-context'
import React, { lazy, Suspense } from 'react'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import { PATH } from 'utils/path'
import { ThemeProvider } from 'contexts/theme-context'

const HomePage = React.lazy(() => import('pages/HomePage'))
const SignInPage = lazy(() => import('pages/SignInPage'))
const SignUpPage = lazy(() => import('pages/SignUpPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))
const Dashboard = lazy(() => import('module/dashboard/Dashboard'))
const BlogPage = lazy(() => import('pages/BlogPage'))
const SearchPage = lazy(() => import('pages/SearchPage'))
const FavouritePage = lazy(() => import('pages/FavouritePage'))

/* Manage Post */
const AddPost = lazy(() => import('module/post/AddPost'))
const Posts = lazy(() => import('module/post/Posts'))
const UpdatePost = lazy(() => import('module/post/UpdatePost'))
const DetailPostPage = lazy(() => import('pages/DetailPostPage'))

/* Manage User */
const User = lazy(() => import('module/user/User'))
const UpdateUser = lazy(() => import('module/user/UpdateUser'))
const AddUser = lazy(() => import('module/user/AddUser'))
const AccountInfo = lazy(() => import('module/user/AccountInfo'))
const ChangePassword = lazy(() => import('module/user/ChangePassword'))
const AuthorPage = lazy(() => import('pages/AuthorPage'))

/* Manage Category */
const AddCategory = lazy(() => import('module/category/AddCategory'))
const Category = lazy(() => import('module/category/Category'))
const CategoryUpdate = lazy(() => import('module/category/CategoryUpdate'))
const CategoryPage = lazy(() => import('pages/CategoryPage'))

const MainRoutes = () => {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Suspense>
            <Routes>
              <Route path={PATH.main} element={<HomePage />}></Route>
              <Route path={PATH.sign_up} element={<SignUpPage />}></Route>
              <Route path={PATH.sign_in} element={<SignInPage />}></Route>
              <Route path={PATH.blog} element={<BlogPage />}></Route>
              <Route path={PATH.search} element={<SearchPage />}></Route>
              <Route path={PATH.not_found} element={<NotFoundPage />}></Route>

              <Route
                element={
                  <Suspense>
                    <DashboardLayout />
                  </Suspense>
                }
              >
                <Route path={PATH.dashboard.dashboard} element={<Dashboard />}></Route>

                {/* Manage Post */}
                <Route path={PATH.dashboard.add_post} element={<AddPost />}></Route>
                <Route path={PATH.dashboard.posts} element={<Posts />}></Route>
                <Route path={PATH.dashboard.update_post} element={<UpdatePost />}></Route>

                {/* Manage User */}
                <Route path={PATH.dashboard.users} element={<User />}></Route>
                <Route path={PATH.dashboard.update_user} element={<UpdateUser />}></Route>
                <Route path={PATH.dashboard.add_user} element={<AddUser />}></Route>
                <Route path={PATH.dashboard.account_infomation} element={<AccountInfo />}></Route>
                <Route path={PATH.dashboard.change_password} element={<ChangePassword />}></Route>

                {/* Manage Category */}
                <Route path={PATH.dashboard.categories} element={<Category />}></Route>
                <Route path={PATH.dashboard.add_category} element={<AddCategory />}></Route>
                <Route path={PATH.dashboard.update_category} element={<CategoryUpdate />}></Route>
              </Route>

              <Route path={PATH.detail_post} element={<DetailPostPage />}></Route>
              <Route path={PATH.author} element={<AuthorPage />}></Route>
              <Route path={PATH.category} element={<CategoryPage />}></Route>
              <Route path={PATH.favourite} element={<FavouritePage />}></Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
export default MainRoutes
