import { Blur } from 'components/blur'
import { Button } from 'components/button'
import { IconMenu } from 'components/icon'
import { Sidebar } from 'components/sidebar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebase-config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'

const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .sidebarBtn{
    display: none;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
      background-position: center center;
    }
  }
  .logout{
    padding:  0 10px;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width:540px){
        .logo{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            margin-right: 1em;
            font-size: 2em;
        }
    }

    /* Tablet */
    @media (min-width:541px) and (max-width: 949px)
    {   
        padding: 20px;
        display: flex;
        align-items: center:
        justify-content: center;

        .logo{
            display: none;
        }
        .sidebarBtn{
            display: inline-block;
            margin-right: 1em;
            font-size: 2em;
        }
    }
`

const DashboardHeader = () => {
  const { userInfo } = useAuth()
  const [open, setOpen] = useState(false)

  if (!userInfo) return <NotFoundPage></NotFoundPage>
  return (
    <DashboardHeaderStyles className="dashboard-header">
      <button className="sidebarBtn" onClick={() => setOpen(true)}>
        <IconMenu></IconMenu>
      </button>
      {open && (
        <>
          <Blur onClick={() => setOpen(false)}></Blur>
        </>
      )}

      <Sidebar
        className={open ? 'visible translate-x-0' : 'invisible -translate-x-full'}
        setOpen={setOpen}
        number1="2"
        number2="6"
      ></Sidebar>
      <Link to="/" className="logo">
        <img src="/logo.png" alt="react-blogging" className="block w-10" />
        <span className="text-gray-500">React blogging</span>
      </Link>
      <div className="header-right">
        <Link to="/manage/add-post" className="inline">
          <Button type="button">Write new post</Button>
        </Link>
        <Link to={`/account-information/${userInfo?.username}`} className="header-avatar">
          <img src={userInfo?.avatar ? userInfo?.avatar : '/avatar.jpg'} alt="avatar" />
        </Link>
      </div>
    </DashboardHeaderStyles>
  )
}

export default DashboardHeader
