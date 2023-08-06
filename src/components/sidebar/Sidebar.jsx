import { IconAdd, IconArrowLeft, IconLogout, IconMinus } from 'components/icon'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import Language from 'components/language'
import { useDarkTheme } from 'contexts/theme-context'
import { useAuth } from 'contexts/auth-context'
import useLogout from 'hooks/useLogout'

const SidebarStyles = styled.ul`
  position: fixed;
  width: 250px;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: #203040;
  justify-content: space-between;
  transition: all 0.3s ease-in;
  overflow-y: auto;

  .menu-language {
    display: block !important;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 1.25rem;
  }
  .header-main {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    flex: 1;
  }
  .logo-sidebar {
    display: inline-block;
    max-width: 40px;
  }
  .search-input {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .menu-item {
    line-height: 1.5em;
    padding: 12px 2em;
    font-weight: 600;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
  .list-item {
    border-radius: 6px;
    background-color: rgb(100 116 139);
    display: flex;
    flex-direction: column;
    transition: all 0.3s linear;
    overflow: hidden;
    transition-duration: 300ms;
    a {
      color: white;
      align-items: center;
      padding: 15px 3.5rem;
      display: flex;
    }
    a:hover {
      background-color: #526272;
    }
  }
  .account-item,
  .category-item {
    white-space: nowrap;
  }

  /* @media (min-width: 949px) {
    display: none;
  } */
`

/**
 * @param {*} setOpen Handler onClick
 * @requires
 *
 */

const Sidebar = ({ className = '', setOpen = () => {}, number1 = '0', number2 = '0' }) => {
  const { darkTheme, toggleDarkTheme } = useDarkTheme()
  const { handleLogout } = useLogout()
  const { userInfo } = useAuth()
  const [checkCate, setCheckCate] = useState(false)
  const [checkAccount, setCheckAccount] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const colRef = collection(db, 'categories')
    onSnapshot(colRef, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
        setCategories(results)
      })
    })
  }, [])

  return (
    <SidebarStyles className={`hide-scrollbar ${className}`}>
      <div>
        <div className="header">
          <div className="header-main">
            <Link to="/">
              <img src="/logo.png" alt="react-blogging" className="logo-sidebar" />
            </Link>
            <h2 className="font-semibold text-white">React Blogging</h2>
          </div>
          <div className="absolute text-3xl font-semibold cursor-pointer right-3">
            <IconArrowLeft onClick={() => setOpen(false)}></IconArrowLeft>
          </div>
        </div>

        <div className="mt-5">
          <div className="bg-white px-4 mx-4 flex justify-between items-center py-1 rounded-md">
            Chế độ: {darkTheme ? 'Tối' : 'Sáng'}
            <button
              onClick={toggleDarkTheme}
              className="bg-green-500 text-white px-3 py-2 rounded-full"
            >
              Đổi
            </button>
          </div>

          <div className="px-4 mt-5">
            <Language showName={true} />
          </div>

          <div className="mt-5">
            {SidebarData.length > 0 &&
              SidebarData.slice(number1, number2).map((item) => (
                <div className="flex flex-col" key={item.title}>
                  <div className="menu-item">
                    <div className="flex items-center gap-x-4 relative w-full">
                      <Link to={item.url}>{item.icon}</Link>
                      <Link to={item.url}>{item.title}</Link>
                    </div>

                    {item.title === 'Category' && (
                      <>
                        <div
                          className={`transition-transform duration-500 absolute right-3 z-10 ${
                            checkCate ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          <input
                            onClick={() => setCheckCate(!checkCate)}
                            type="checkbox"
                            className="absolute top-0 inset-x-0 h-full z-10 cursor-pointer opacity-0"
                          />
                          {checkCate ? <IconMinus /> : <IconAdd />}
                        </div>
                      </>
                    )}

                    {item.title === 'Account' && (
                      <div
                        className={`transition-transform duration-500 absolute right-3 z-10 ${
                          checkAccount ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <input
                          onClick={() => setCheckAccount(!checkAccount)}
                          type="checkbox"
                          className="absolute top-0 inset-x-0 h-full z-10 cursor-pointer opacity-0"
                        />
                        {checkAccount ? <IconMinus /> : <IconAdd />}
                      </div>
                    )}
                  </div>

                  {item.title === 'Category' && (
                    <div
                      className={`list-item mx-4 ${
                        checkCate
                          ? 'max-h-auto visible -translate-y-5 '
                          : 'max-h-0 invisible translate-y-0'
                      }`}
                    >
                      {categories?.length > 0 &&
                        categories?.map((item) => (
                          <Link
                            className="category-item"
                            to={`/category/${item.slug}`}
                            key={item.id}
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  )}

                  {item.title === 'Account' && (
                    <div
                      className={`list-item mx-4 ${
                        checkAccount
                          ? 'max-h-auto visible -translate-y-5 '
                          : 'max-h-0 invisible translate-y-0'
                      }`}
                    >
                      {item.subMenu.map((subItem) => (
                        <Link className="account-item" to={subItem.url} key={subItem.title}>
                          {subItem.icon}
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {userInfo.email && (
              <div className="menu-item flex gap-x-4 hover:bg-gray-500" onClick={handleLogout}>
                <IconLogout />
                <div className="flex-1">Đăng xuất</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarStyles>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  setOpen: PropTypes.func,
  number1: PropTypes.string.isRequired,
  number2: PropTypes.string.isRequired,
}

export default Sidebar
