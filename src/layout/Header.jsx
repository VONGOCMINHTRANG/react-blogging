import styled from 'styled-components'
import { menuLinks } from './HeaderData'
import { Button } from 'components/button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/auth-context'
import { Sidebar } from 'components/sidebar'
import Search from 'components/search/Search'
import { IconDark, IconLight, IconMenu } from 'components/icon'
import { Blur } from 'components/blur'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase-config'
import LoadingSkeletonHeader from 'components/loading/LoadingSkeletonHeader'
import { categoryStatus } from 'utils/constants'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'
import Swal from 'sweetalert2'
import { signOut } from 'firebase/auth'

const HeaderStyles = styled.header`
    padding: 20px 0px;
    display: flex;
    align-items: center:
    justify-content: center;

    .sidebarBtn{
        display: none;
    }
    .container{
        margin: 0 auto;
        width: 80vw;
        transition: width .1s;
        padding: 0;
    }
    .header-main{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }
    .logo{
        display: block;
        max-width: 40px;
        height:auto;
    }
    .menu{
        display: flex;
        align-items: center;
        -webkit-box-align: center;
        margin-left: 40px;
        list-style: none;
        font-weight: 500;
        gap: 20px;
        &-link{
            color: #585858;
            text-decoration: none;
            font-weight: 600;
        }
    }
    .header-button{
        max-width: 200px;
    }
    .theme{
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 10px;
      background-color: rgb(29, 192, 113);
      color: white;
      border-radius: 8px;
      margin: 0 20px;
      font-size: 18px;
      cursor: pointer;
      font-weight: 500;
    }

    /* Mobile */
    @media (max-width:540px){
        .container{
          width: 100%;
          flex: 1
        }
        .logo, .menu, .theme, .header-button{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            font-size: 2em;
            margin: 0 20px;
        }
        .search{
          margin-left: 0;
          width: auto;
        }
        .avatar{
          cursor: pointer;
          margin: 0 10px;
        }
        input{
          padding: 5px 10px;
          border-radius: 5px;
        }
    }

    @media (min-width: 950px){
      .sidebar, .blur{
        display: none;
      }
    }

    /* Tablet */
    @media (min-width:541px) and (max-width:949px)
    {   
        display: flex;
        align-items: center:
        justify-content: center;
        .container{
          width: 90vw;
        }
        .logo, .menu, .theme, .header-button{
            display: none;
        }
        .avatar{
          cursor: pointer;
          margin-top: auto;
          margin-bottom: auto;
          margin: 0 20px;
        }
        .search{
          width: auto;
          flex: 1;
        }
        input{
          padding: 5px 10px;
          border-radius: 5px;
        }
        .sidebarBtn{
            display: inline-block;
            font-size: 2em;
        }
    }

    @media (min-width: 950px){
      .avatar{
        display: none
      }
    }
`

const Header = () => {
  const { userInfo } = useAuth()
  const navigate = useNavigate()
  const { darkTheme, toggleDarkTheme } = useDarkTheme()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [loading, isLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  console.log(userInfo)

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(29, 192, 113)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Login successfully', '', 'success')
        signOut(auth)
        window.location.reload()
        navigate(0)
      }
    })
  }

  const handleSearch = () => {
    navigate(PATH.search, { state: searchQuery })
  }

  useEffect(() => {
    const categoryRef = collection(db, 'categories')
    const fetchCategoryName = async () => {
      try {
        const q = query(categoryRef, where('status', '==', categoryStatus.APPROVED))
        onSnapshot(q, (snapshot) => {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            })
            isLoading(true)
            setTimeout(() => {
              isLoading(false)
              setCategories(results)
            }, 250)
          })
        })
      } catch (error) {
        console.log(error)
        isLoading(true)
      }
    }
    fetchCategoryName()
  }, [])

  return (
    <>
      {loading && <LoadingSkeletonHeader></LoadingSkeletonHeader>}

      {!loading && (
        <HeaderStyles className={darkTheme ? 'bg-black/80' : ''}>
          <div className="container">
            <div className="header-main">
              <NavLink to="/">
                <img src="/logo.png" alt="react-blogging" className="logo" />
              </NavLink>
              <ul className="menu">
                {menuLinks.length > 0 &&
                  menuLinks.slice(0, 3).map((item) => (
                    <li className="menu-item group transition-all" key={item.title}>
                      <NavLink to={item.url} className="menu-link">
                        <span className={darkTheme ? 'text-white' : ''}>{item.title}</span>
                      </NavLink>

                      {item.title === 'Category' && (
                        <div className="hidden group-hover:block bg-gray-100 border border-gray-200 rounded-sm absolute z-30 text-green-700 cursor-pointer delay-500 font-semibold">
                          {categories?.length > 0 &&
                            categories?.map((category) => (
                              <div key={category?.id} className="hover:bg-green-200 p-2">
                                <NavLink to={`/category/${category?.slug}`}>
                                  {category?.name}
                                </NavLink>
                              </div>
                            ))}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>

              <div className="theme" onClick={toggleDarkTheme}>
                {darkTheme ? (
                  <>
                    <span className="theme-title">Dark</span>
                    <IconDark></IconDark>
                  </>
                ) : (
                  <>
                    <span className="theme-title">Light</span>
                    <IconLight></IconLight>
                  </>
                )}
              </div>

              {open && (
                <>
                  <Blur onClick={() => setOpen(false)}></Blur>
                </>
              )}

              <Sidebar
                className={
                  open ? 'sidebar visible translate-x-0' : 'sidebar invisible -translate-x-full'
                }
                setOpen={setOpen}
                number1="0"
                number2="4"
              ></Sidebar>

              <div className="flex justify-between flex-1">
                <button onClick={() => setOpen(true)} className="sidebarBtn">
                  <IconMenu></IconMenu>
                </button>

                <Search setSearchQuery={setSearchQuery} handleSearch={handleSearch}></Search>

                <div className="avatar relative group" onClick={() => setMenu(!menu)}>
                  <img
                    src={userInfo.avatar ? userInfo.avatar : '/avatar.jpg'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {menu && userInfo.email && (
                    <ul className="z-10 absolute whitespace-nowrap mt-2 right-3 text-sm transition-all rounded bg-slate-600 text-white font-semibold">
                      <li
                        onClick={() =>
                          navigate(`${PATH.dashboard.account_infomation}${userInfo.username}`)
                        }
                        className="p-2 hover:bg-slate-300 hover:text-green-600"
                      >
                        Account Information
                      </li>
                      <li
                        onClick={() =>
                          navigate(`${PATH.dashboard.change_password}${userInfo.username}`)
                        }
                        className="p-2 hover:bg-slate-300 hover:text-green-600"
                      >
                        Change password
                      </li>
                      <li
                        onClick={toggleDarkTheme}
                        className="p-2 hover:bg-slate-300 hover:text-green-600 flex gap-2"
                      >
                        {darkTheme ? (
                          <>
                            Light theme
                            <IconLight></IconLight>
                          </>
                        ) : (
                          <>
                            Dark theme
                            <IconDark></IconDark>
                          </>
                        )}
                      </li>
                      <li
                        onClick={handleLogout}
                        className="p-2 hover:bg-slate-300 hover:text-green-600"
                      >
                        Logout
                      </li>
                    </ul>
                  )}

                  {menu && userInfo.length === 0 && (
                    <ul className="z-10 absolute whitespace-nowrap mt-2 right-3 text-sm transition-all rounded bg-slate-600 text-white font-semibold">
                      <li
                        onClick={() => navigate(PATH.sign_in)}
                        className="p-2 hover:bg-slate-300 hover:text-green-600"
                      >
                        Login
                      </li>
                      <li
                        onClick={() => navigate(PATH.sign_up)}
                        className="p-2 hover:bg-slate-300 hover:text-green-600"
                      >
                        Sign up
                      </li>
                      <li
                        onClick={toggleDarkTheme}
                        className="p-2 hover:bg-slate-300 hover:text-green-600 flex gap-2"
                      >
                        {darkTheme ? (
                          <>
                            Light theme
                            <IconLight></IconLight>
                          </>
                        ) : (
                          <>
                            Dark theme
                            <IconDark></IconDark>
                          </>
                        )}
                      </li>
                      <li></li>
                    </ul>
                  )}
                </div>
              </div>

              <Link to={userInfo.length === 0 ? PATH.sign_in : '/manage/dashboard'}>
                <Button type="button" className="header-button" height="100%">
                  {userInfo.length === 0 ? 'Login' : 'Dashboard'}
                </Button>
              </Link>
            </div>
          </div>
        </HeaderStyles>
      )}
    </>
  )
}

export default Header
