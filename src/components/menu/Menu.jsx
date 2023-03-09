import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MenuData } from './MenuData'

const MenuStyles = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 12px;
  height: fit-content;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 600;
    color: rgb(128, 129, 145);
    margin-bottom: 20px;
    cursor: pointer;
  }
  .menu-item:hover {
    color: rgb(29, 192, 113);
    background-color: rgb(241, 251, 247);
  }
  @media (max-width: 1239px) {
    display: none;
  }
`

const Menu = () => {
  return (
    <MenuStyles className="menu shadow-lg">
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
