import { IconArrowDown, IconArrowLeft } from 'components/icon'
import Search from 'components/search/Search'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'

const SidebarStyles = styled.ul`
  position: fixed;
  width: fit-content;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-between;
  transition: all 0.3s ease-in;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
  }
  .header-main {
    display: flex;
    align-items: center;
    column-gap: 1rem;
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
    color: rgb(128, 129, 145);
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu-item:hover {
    color: rgb(29, 192, 113);
    background-color: rgb(241, 251, 247);
  }

  @media (min-width: 951px) {
    display: none;
  }
`

const Sidebar = ({ className = '', setOpen = () => {}, number1 = '0', number2 = '0' }) => {
  return (
    <SidebarStyles className={className}>
      <div>
        <div className="header">
          <div className="header-main">
            <Link to="/">
              <img src="/logo.png" alt="react-blogging" className="logo-sidebar" />
            </Link>
            <h2 className="font-semibold">React Blogging</h2>
          </div>
          <div className="text-3xl font-semibold cursor-pointer">
            <IconArrowLeft onClick={() => setOpen(false)}></IconArrowLeft>
          </div>
        </div>
        <div className="search-input">
          <Search></Search>
        </div>

        <div className="mt-5">
          {SidebarData.length > 0 &&
            SidebarData.slice(number1, number2).map((item) => (
              <li className="menu-item" key={item.title}>
                <div className="flex items-center gap-x-4">
                  <span>{item.icon}</span>
                  <a href={item.url}>{item.title}</a>
                </div>
                <span>
                  <IconArrowDown></IconArrowDown>
                </span>
              </li>
            ))}
        </div>
      </div>
    </SidebarStyles>
  )
}

export default Sidebar
