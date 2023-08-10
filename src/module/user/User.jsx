import { Button } from 'components/button'
import Content from 'components/content/Content'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import UserTable from './UserTable'
import Search from 'components/search/Search'
import { debounce } from 'lodash'
import { useAuth } from 'contexts/auth-context'
import { userRole } from 'utils/constants'
import { useDarkTheme } from 'contexts/theme-context'
import { useTranslation } from 'react-i18next'

const UserStyles = styled.div`
  .button {
    width: fit-content;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
    color: white;
    white-space: nowrap;
  }
  .search {
    margin-left: 0px;
  }
  .load-more {
    color: white;
    margin: 1rem auto;
    font-size: 15px;
    padding: 12px 40px;
  }
  @media (max-width: 540px) {
    .button {
      height: auto;
      padding: 15px 5px;
      font-size: 14px;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
    .load-more {
      font-size: 15px;
      padding: 12px 40px;
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
    }
    .search-input {
      padding: 12px 10px;
      font-size: 14px;
    }
    .button {
      padding: 15px 5px;
      font-size: 14px;
      height: auto;
      width: fit-content;
    }
  }
`

const USER_PER_PAGE = 5

const User = () => {
  const { t } = useTranslation()
  const { userInfo } = useAuth()
  const { darkTheme } = useDarkTheme()
  const [userList, setUserList] = useState([])
  const [filter, setFilter] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)
  const [admin, isAdmin] = useState(false)

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMore = async () => {
    try {
      const nextRef = query(collection(db, 'users'), startAfter(lastDoc), limit(USER_PER_PAGE))
      onSnapshot(nextRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setUserList([...userList, ...results])
      })
      const documentSnapshots = await getDocs(nextRef)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      setLastDoc(lastVisible)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const docRef = query(collection(db, 'users'), where('email', '==', userInfo.email))
    onSnapshot(docRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().role === userRole.ADMIN) {
          isAdmin(true)
        }
      })
    })
  }, [userInfo.email])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const colRef = collection(db, 'users')
        const newRef = filter
          ? query(colRef, where('fullname', '>=', filter), where('fullname', '<=', filter + 'utf8'))
          : admin
          ? query(colRef, limit(4))
          : query(colRef, where('email', '==', userInfo.email))

        const documentSnapshots = await getDocs(newRef)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        // console.log(documentSnapshots.docs[0].id)
        // console.log('last', lastVisible)
        setLastDoc(lastVisible)

        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size)
        })

        onSnapshot(newRef, (snapshot) => {
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          setUserList(results)
        })
        setLastDoc(lastVisible)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserData()
  }, [filter, admin])

  return (
    <UserStyles>
      <Content title={t('User')} desc={t('Manage your information.')}></Content>
      {admin && (
        <>
          <div className="utilities">
            <div className="flex gap-10 w-full">
              <Link to="/manage/add-user">
                <Button type="button">{t(`Create user`)}</Button>
              </Link>
              <Search placeholder={t('Search user...')} onChange={handleInputFilter}></Search>
            </div>
          </div>
          <div className={`flex py-2 ${darkTheme ? 'text-white' : ''}`}>
            {t(`Total of user`)}: {total}
          </div>
        </>
      )}

      <UserTable data={userList}></UserTable>
      {total > userList.length && admin && (
        <Button type="button" className="load-more" onClick={handleLoadMore}>
          {t(`Load more`)}
        </Button>
      )}
    </UserStyles>
  )
}

export default User
