import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import React, { lazy, Suspense } from 'react'
import DashboardLayout from 'module/dashboard/DashboardLayout'

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

function App() {
  return (
    <>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

            <Route
              element={
                <Suspense>
                  <DashboardLayout></DashboardLayout>
                </Suspense>
              }
            >
              <Route path="/manage/dashboard" element={<Dashboard></Dashboard>}></Route>

              {/* Manage Post */}
              <Route path="/manage/add-post" element={<AddPost></AddPost>}></Route>
              <Route path="/manage/posts" element={<Posts></Posts>}></Route>
              <Route path="/manage/update-post" element={<UpdatePost></UpdatePost>}></Route>

              {/* Manage User */}
              <Route path="/manage/user" element={<User></User>}></Route>
              <Route path="/manage/update-user" element={<UpdateUser></UpdateUser>}></Route>
              <Route path="/manage/add-user" element={<AddUser></AddUser>}></Route>
              <Route
                path="/manage/account-information/:userId"
                element={<AccountInfo></AccountInfo>}
              ></Route>
              <Route
                path="/account-information/change-password/:userId"
                element={<ChangePassword></ChangePassword>}
              ></Route>

              {/* Manage Category */}
              <Route path="/manage/category" element={<Category></Category>}></Route>
              <Route path="/manage/add-category" element={<AddCategory></AddCategory>}></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
            </Route>

            <Route path="/detail-post/:slug" element={<DetailPostPage></DetailPostPage>}></Route>
            <Route path="/author/:slug" element={<AuthorPage></AuthorPage>}></Route>
            <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  )
}

export default App
