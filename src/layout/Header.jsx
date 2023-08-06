import styled from 'styled-components'
import { menuLinks } from './HeaderData'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/auth-context'
import { Sidebar } from 'components/sidebar'
import Search from 'components/search/Search'
import { IconMenu, IconSearch } from 'components/icon'
import { Blur } from 'components/blur'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import LoadingSkeletonHeader from 'components/loading/LoadingSkeletonHeader'
import { categoryStatus } from 'utils/constants'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'
import useClickOutsite from 'hooks/useClickOutside'
import Language from 'components/language'
import MenuUser from 'components/menu/menuUser'

const HeaderStyles = styled.header`
    padding: 20px;
    display: flex;
    align-items: center:
    justify-content: center;

    .sidebarBtn{
        display: none;
    }
    .container{
        margin: 0 auto;
        width: 100%;
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
      gap: 4px;
      padding: 8px 12px;
      background-color: rgb(29, 192, 113);
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }
    .avatar{
      cursor: pointer;
      margin-top: auto;
      margin-bottom: auto;
    }
    .icon-search{
      display: block;
      cursor: pointer;
      border-radius: 100%;
      background-color: #C8C8C8;
      padding: 10px;
    }
    .header-right{
      display: flex;
      justify-content: space-between;
      flex: 1;
      align-items: center;
      gap: 12px;
    }

    /* Mobile */
    @media (max-width:540px){
        padding: 20px;
        .container{
          width: 100%;
          flex: 1
        }
        .logo, .menu, .theme, .header-button, .icon-search, .menu-language, .avatar{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            font-size: 2em;
            margin: 0 10px;
        }
        .search{
          display: flex;
          align-items: center;
          width: 100%;
          margin: auto 0;

          input{
            min-height: 40px;
            padding: 0 50px 0 15px;
            display: flex;
            align-items: center;
          }
        }
   
    }

    @media (min-width: 950px){
      .sidebar, .blur, .search{
        display: none;
      }
      .header-right{
        justify-content: right;
      }
    }

    /* Tablet */
    @media (min-width:541px) and (max-width:949px)
    {   
        display: flex;
        align-items: center:
        justify-content: center;
        padding: 20px;
        .container{
          width: 90vw;
        }
        .logo, .menu, .theme, .header-button, .icon-search, .menu-language{
            display: none;
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

    @media (max-width: 949px) {
    .suggested-search {
      top: 45px;
    }
  }
`

const Header = () => {
  const { userInfo } = useAuth()
  const navigate = useNavigate()
  const { darkTheme, toggleDarkTheme } = useDarkTheme()
  const [open, setOpen] = useState(false)
  const [loading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const { show, nodeRef } = useClickOutsite()
  const [, setCheckUser] = useState(false)

  const handleSearch = () => {
    navigate(PATH.search, { state: searchQuery })
  }

  const handleOpenSearch = () => {}

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

            setCategories(results)
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategoryName()
  }, [])

  useEffect(() => {
    try {
      if (userInfo.length === 0) {
        setCheckUser(false)
      }
      if (userInfo.email) {
        setCheckUser(true)
      }
    } catch (error) {
      console.log(error)
    }
  }, [userInfo])

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
                  menuLinks.map((item) => (
                    <li className="menu-item group transition-all relative" key={item.title}>
                      <NavLink to={item.url} className="menu-link">
                        <span className={darkTheme ? 'text-white' : ''}>{item.title}</span>
                      </NavLink>

                      {item.title === 'Category' && (
                        <div className="hidden group-hover:block w-auto bg-slate-200 border border-gray-200 right-0 whitespace-nowrap rounded-sm absolute z-30 cursor-pointer delay-500 font-semibold">
                          {categories?.length > 0 &&
                            categories?.map((category) => (
                              <div
                                onClick={() => navigate(`/category/${category?.slug}`)}
                                key={category?.id}
                                className="hover:bg-slate-300 p-2 text-slate-700 hover:text-black/75 text-sm"
                              >
                                {category?.name}
                              </div>
                            ))}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>

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
                number2={userInfo.email ? '5' : '4'}
              ></Sidebar>

              <div className="header-right">
                <button onClick={() => setOpen(true)} className="sidebarBtn">
                  <IconMenu />
                </button>

                <Search setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

                <div className="icon-search cursor-pointer" onClick={handleOpenSearch}>
                  <IconSearch />
                </div>

                <div
                  onClick={toggleDarkTheme}
                  className="theme bg-green-500 cursor-pointer px-3 py-2 gap-1 text-white rounded-md flex items-center"
                >
                  {darkTheme ? 'Dark theme' : 'Light theme'}
                </div>

                <Language />

                <div className="avatar relative">
                  <img
                    src={userInfo.avatar ? userInfo.avatar : '/avatar.jpg'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    ref={nodeRef}
                  />

                  {show && <MenuUser className="mt-1" />}
                </div>
              </div>
            </div>
          </div>
        </HeaderStyles>
      )}
    </>
  )
}

export default Header
