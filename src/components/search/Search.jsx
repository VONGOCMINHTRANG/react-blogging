import { IconSearch } from 'components/icon'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    width: 50px;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: all 0.1s linear;
  }
  .search-icon:hover {
    background-color: #e0e0e0;
  }
`

const Search = ({
  placeholder = 'Search post...',
  setSearchQuery = () => {},
  onClick = {},
  handleSearch,
  ...props
}) => {
  return (
    <SearchStyles className="search">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
        {...props}
      />
      <div className="search-icon cursor-pointer" onClick={handleSearch}>
        <IconSearch></IconSearch>
      </div>
    </SearchStyles>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
}

export default Search
