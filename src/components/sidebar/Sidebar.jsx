import { IconAdd, IconArrowLeft, IconMinus } from 'components/icon'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'

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
    padding: 1em 2em;
    font-weight: 600;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
  .menu-item:hover {
    background-color: #526272;
  }
  .list-item {
    display: flex;
    flex-direction: column;
    transition: all 0.3s linear;
    overflow: hidden;
    transition-duration: 300ms;
    a {
      color: white;
      align-items: center;
      padding: 20px 4.5em;
    }
    a:hover {
      background-color: #526272;
    }
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
  const [checked, setChecked] = useState(false)
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
          {SidebarData.length > 0 &&
            SidebarData.slice(number1, number2).map((item, i) => (
              <div className="flex flex-col" key={item.title}>
                <div className="menu-item">
                  <div className="flex items-center gap-x-4 relative w-full">
                    <Link to={item.url}>{item.icon}</Link>
                    <Link to={item.url}>{item.title}</Link>
                  </div>

                  {item.title === 'Category' && (
                    <div
                      className={`transition-transform duration-500 absolute right-3 z-10 ${
                        checked ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <input
                        onClick={() => setChecked(!checked)}
                        type="checkbox"
                        className="absolute top-0 inset-x-0 h-full z-10 cursor-pointer opacity-0"
                      />
                      {checked ? <IconMinus></IconMinus> : <IconAdd></IconAdd>}
                    </div>
                  )}
                </div>
                {item.title === 'Category' && (
                  <div
                    className={`list-item ${
                      checked
                        ? 'max-h-auto visible -translate-y-5 '
                        : 'max-h-0 invisible translate-y-0'
                    }`}
                  >
                    {categories?.length > 0 &&
                      categories?.map((item) => (
                        <Link className="category-item" to={`/category/${item.slug}`} key={item.id}>
                          {item.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
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
