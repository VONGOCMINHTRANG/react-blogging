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
              <Route path={PATH.main} element={<HomePage></HomePage>}></Route>
              <Route path={PATH.sign_up} element={<SignUpPage></SignUpPage>}></Route>
              <Route path={PATH.sign_in} element={<SignInPage></SignInPage>}></Route>
              <Route path={PATH.blog} element={<BlogPage></BlogPage>}></Route>
              <Route path={PATH.not_found} element={<NotFoundPage></NotFoundPage>}></Route>

              <Route
                element={
                  <Suspense>
                    <DashboardLayout></DashboardLayout>
                  </Suspense>
                }
              >
                <Route path={PATH.dashboard.dashboard} element={<Dashboard></Dashboard>}></Route>

                {/* Manage Post */}
                <Route path={PATH.dashboard.add_post} element={<AddPost></AddPost>}></Route>
                <Route path={PATH.dashboard.posts} element={<Posts></Posts>}></Route>
                <Route
                  path={PATH.dashboard.update_post}
                  element={<UpdatePost></UpdatePost>}
                ></Route>

                {/* Manage User */}
                <Route path={PATH.dashboard.users} element={<User></User>}></Route>
                <Route
                  path={PATH.dashboard.update_user}
                  element={<UpdateUser></UpdateUser>}
                ></Route>
                <Route path={PATH.dashboard.add_user} element={<AddUser></AddUser>}></Route>
                <Route
                  path={PATH.dashboard.account_infomation}
                  element={<AccountInfo></AccountInfo>}
                ></Route>
                <Route
                  path={PATH.dashboard.change_password}
                  element={<ChangePassword></ChangePassword>}
                ></Route>

                {/* Manage Category */}
                <Route path={PATH.dashboard.categories} element={<Category></Category>}></Route>
                <Route
                  path={PATH.dashboard.add_category}
                  element={<AddCategory></AddCategory>}
                ></Route>
                <Route
                  path={PATH.dashboard.update_category}
                  element={<CategoryUpdate></CategoryUpdate>}
                ></Route>
              </Route>

              <Route path={PATH.detail_post} element={<DetailPostPage></DetailPostPage>}></Route>
              <Route path={PATH.author} element={<AuthorPage></AuthorPage>}></Route>
              <Route path={PATH.category} element={<CategoryPage></CategoryPage>}></Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
export default MainRoutes
