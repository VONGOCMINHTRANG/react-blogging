import { IconSearch } from 'components/icon'
import styled from 'styled-components'

const SearchStyles = styled.div`
  margin-left: auto;
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  position: relative;
  margin-right: 20px;

  input {
    border-radius: 8px;
    padding: 15px 45px 15px 20px;
    flex: 1;
    font-weight: 500;
    background-color: rgb(231, 236, 243);
    border: 1px solid transparent;
    transition: all 0.2s linear 0s;
    outline: none;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.secondary};
  }
  input::-webkit-input-placeholder {
    color: #808080;
    opacity: 0.6;
    font-weight: 500;
  }
  input::-moz-input-placeholder {
    color: #808080;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
`

const Search = ({ placeholder = 'Search posts...', ...props }) => {
  return (
    <SearchStyles className="search">
      <input type="text" placeholder={placeholder} className="search-input" {...props} />
      <span className="search-icon cursor-pointer">
        <IconSearch></IconSearch>
      </span>
    </SearchStyles>
  )
}

export default Search
