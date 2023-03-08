import styled from 'styled-components'
import { menuLinks } from './HeaderData'
import { Button } from 'components/button'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'contexts/auth-context'
import { Sidebar } from 'components/sidebar'
import Search from 'components/search/Search'
import { IconMenu } from 'components/icon'
import { Blur } from 'components/blur'
import { useState } from 'react'

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

    /* Mobile */
    @media (max-width:540px){
        .logo, .menu, .header-button{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            margin-right: 1em;
            font-size: 2em;
        }
    }

    /* Tablet */
    @media (min-width:541px) and (max-width:950px)
    {   
        padding: 20px 0px;
        display: flex;
        align-items: center:
        justify-content: center;

        .logo, .menu{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            margin-right: 1em;
            font-size: 2em;
        }
    }
`

const Header = () => {
  const { userInfo } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <button onClick={() => setOpen(true)} className="sidebarBtn">
            <IconMenu></IconMenu>
          </button>
          <NavLink to="/">
            <img src="/logo.png" alt="react-blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.length > 0 &&
              menuLinks.slice(0, 3).map((item) => (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>

          {open && (
            <>
              <Blur onClick={() => setOpen(false)}></Blur>
            </>
          )}

          <Sidebar
            className={open ? 'visible translate-x-0' : 'invisible -translate-x-full'}
            setOpen={setOpen}
            number1="0"
            number2="4"
          ></Sidebar>

          <Search></Search>
          <a href={userInfo === null ? '/sign-in' : '/dashboard'}>
            <Button type="button" className="header-button" height="100%">
              {userInfo === null ? 'Login' : 'Dashboard'}
            </Button>
          </a>
        </div>
      </div>
    </HeaderStyles>
  )
}

export default Header
