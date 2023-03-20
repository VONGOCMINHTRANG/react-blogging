import styled from 'styled-components'

const LoadingSkeletonHeaderStyles = styled.div`
    padding: 20px 0px;
    display: flex;
    align-items: center:
    justify-content: center;
    flex: 1 1 0%;

    .sidebarBtn{
        display: none;
    }
    .icon{
        width: 24px;
        height: 24px;
        background-color: ${(props) => props.theme.skeleton};
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
        width: 40px;
        height: 40px;
        background-color: ${(props) => props.theme.skeleton};
    }
    .menu{
        display: flex;
        align-items: center;
        margin-left: 40px;
        &-item{
            display: flex;
            gap: 10px;
        }
        &-link{
            background-color: ${(props) => props.theme.skeleton};;
            height: 20px; 
            width: 60px;
        }
      
    }
    .header-button{
        width: 100%;
        max-width: 125px;
        height: 48px;
        border-radius: 10px;
        background-color: ${(props) => props.theme.skeleton};
    }
    .header-right{
        gap: 20px;
        display: flex;
        flex: 1;
        justify-content: end;
        margin-right: auto;
    }
    .search{
        border-radius: 8px;
        max-width: 320px;
        width: 100%;
        background-color: ${(props) => props.theme.skeleton};
        height: 50px;
        right: 0;
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
    }`

const LoadingSkeletonHeader = () => {
  return (
    <LoadingSkeletonHeaderStyles>
      <div className="container">
        <div className="header-main">
          <button className="sidebarBtn">
            <div className="icon"></div>
          </button>

          <div className="logo"></div>

          <ul className="menu">
            <div className="menu-item">
              <div className="menu-link"></div>
              <div className="menu-link"></div>
              <div className="menu-link"></div>
            </div>
          </ul>

          <div className="header-right">
            <div className="search"></div>
            <div className="header-button"></div>
          </div>

          {/* <Search></Search>
          <a href={userInfo == '' ? '/sign-in' : '/dashboard'}>
            <Button type="button" className="header-button" height="100%">
              {userInfo == '' ? 'Login' : 'Dashboard'}
            </Button>
          </a> */}
        </div>
      </div>
    </LoadingSkeletonHeaderStyles>
  )
}

export default LoadingSkeletonHeader
