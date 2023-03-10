import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MenuData } from './MenuData'

const MenuStyles = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 12px;
  height: fit-content;
  display: flex;
  width: 100%;
  justify-content: space-between;
  .menu-item {
    display: flex;
    flex: 1 1 0%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    font-weight: 600;
    color: rgb(29, 192, 113);
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: rgb(241, 251, 247);
  }
  @media (max-width: 949px) {
    display: none;
  }
`

const Menu = () => {
  return (
    <MenuStyles className="menu shadow-lg border">
      {MenuData.length > 0 &&
        MenuData.map((item) => (
          <Link to={item.url} className="menu-item" key={item.title}>
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.title}</span>
          </Link>
        ))}
    </MenuStyles>
  )
}

export default Menu
