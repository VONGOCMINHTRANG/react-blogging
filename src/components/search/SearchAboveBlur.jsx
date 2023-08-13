import { IconSearch } from 'components/icon'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { PATH } from 'utils/path'
import { useNavigate } from 'react-router-dom'
import useClickOutsite from 'hooks/useClickOutside'
import { useTranslation } from 'react-i18next'

const SearchAboveBlurStyles = styled.div`
  margin-left: auto;
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  position: absolute;
  margin-right: 20px;
  z-index: 30;

  input {
    border-radius: 8px;
    padding: 15px 45px 15px 20px;
    flex: 1;
    font-weight: 500;
    background-color: rgb(231, 236, 243);
    border: 1px solid transparent;
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
  }
  .search-icon:hover {
    background-color: #e0e0e0;
  }
  .suggested-search {
    z-index: 40;
    position: absolute;
    width: 100%;
    background-color: rgb(226 232 240);
    border-radius: 0.375rem;
    border-width: 1px;
    top: 64px;
  }
`

const SearchAboveBlur = ({
  placeholder = 'Search post...',
  setSearchQuery = () => {},
  onClick = {},
  handleSearch,
  className = '',
  openSearch,
  ...props
}) => {
  const { t } = useTranslation()
  const [postName, setPostName] = useState([])
  const navigate = useNavigate()
  const { show, setShow, nodeRef } = useClickOutsite()

  useEffect(() => {
    const postsRef = collection(db, 'posts')
    const fetchPostNameData = async () => {
      try {
        const q = query(postsRef, where('status', '==', 1), limit(5))
        onSnapshot(q, (snapshot) => {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push(doc.data().title)
          })
          setPostName(results)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchPostNameData()
  }, [])

  return (
    <>
      <div
        className={`${
          openSearch ? 'block' : 'hidden'
        } fixed inset-0 bg-gray-600 bg-opacity-50 z-20`}
        onClick={onClick}
      ></div>
      <SearchAboveBlurStyles className={`search-above-blur ${className}`} ref={nodeRef}>
        <input
          type="text"
          placeholder={t(placeholder)}
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={nodeRef}
          {...props}
          onClick={() => setShow(!show)}
        />
        <div className="search-icon cursor-pointer" onClick={handleSearch}>
          <IconSearch></IconSearch>
        </div>

        {show && (
          <div className="suggested-search drop-shadow-lg top-16">
            <ul className="text-sm text-slate-700">
              {postName.length > 0 &&
                postName?.map((name) => (
                  <li
                    key={name}
                    className="hover:bg-slate-300 cursor-pointer py-2 px-4 hover:text-black/75"
                    onClick={() => navigate(PATH.search, { state: name })}
                  >
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </SearchAboveBlurStyles>
    </>
  )
}

SearchAboveBlur.propTypes = {
  placeholder: PropTypes.string,
}

export default SearchAboveBlur
