import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SignUpPage from 'pages/SignUpPage'
import SignInPage from 'pages/SignInPage'
import HomePage from 'pages/HomePage'
import NotFoundPage from 'pages/NotFoundPage'
import DetailPostPage from 'pages/DetailPostPage'
import Dashboard from 'module/dashboard/Dashboard'
import BlogPage from 'pages/BlogPage'
import AddPost from 'module/post/AddPost'
import Posts from 'module/post/Posts'
import User from 'module/user/User'
import AddCategory from 'module/category/AddCategory'
import Category from 'module/category/Category'
import UpdateUser from 'module/user/UpdateUser'
import CategoryUpdate from 'module/category/CategoryUpdate'
import AddUser from 'module/user/AddUser'
import UpdatePost from 'module/post/UpdatePost'
import CategoryPage from 'pages/CategoryPage'
import AuthorPage from 'pages/AuthorPage'
import AccountInfo from 'module/user/AccountInfo'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>

          {/* Manage Post */}
          <Route path="/detail-post/:slug" element={<DetailPostPage></DetailPostPage>}></Route>
          <Route path="/manage/add-post" element={<AddPost></AddPost>}></Route>
          <Route path="/manage/posts" element={<Posts></Posts>}></Route>
          <Route path="/manage/update-post" element={<UpdatePost></UpdatePost>}></Route>

          {/* Manage User */}
          <Route path="/manage/user" element={<User></User>}></Route>
          <Route path="/manage/update-user" element={<UpdateUser></UpdateUser>}></Route>
          <Route path="/manage/add-user" element={<AddUser></AddUser>}></Route>
          <Route path="/:slug" element={<AuthorPage></AuthorPage>}></Route>
          <Route path="/account-information/:userId" element={<AccountInfo></AccountInfo>}></Route>

          {/* Manage Category */}
          <Route path="/manage/category" element={<Category></Category>}></Route>
          <Route path="/manage/add-category" element={<AddCategory></AddCategory>}></Route>
          <Route path="/manage/update-category" element={<CategoryUpdate></CategoryUpdate>}></Route>
          <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
