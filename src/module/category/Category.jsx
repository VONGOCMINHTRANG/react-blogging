import { Button } from 'components/button'
import Content from 'components/content/Content'
import Search from 'components/search/Search'
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
import { debounce } from 'lodash'
import CategoryTable from './CategoryTable'
import { useAuth } from 'contexts/auth-context'
import { userRole } from 'utils/constants'
import NotFoundPage from 'pages/NotFoundPage'
import { PATH } from 'utils/path'
import { useDarkTheme } from 'contexts/theme-context'

const CategoryStyles = styled.div`
  .button {
    width: fit-content;
    background-color: ${(props) => props.theme.secondary};
    font-weight: bold;
    margin: 0px;
    white-space: nowrap;
  }
  .search {
    margin-left: 0px;
  }
  .load-more {
    color: white;
    margin: 1rem auto;
    font-size: 15px;
    padding: 10px 40px;
  }

  @media (max-width: 540px) {
    .utilities {
      flex-direction: column;
      gap: 20px;
    }
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
      width: fit-content;
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
`
const CATEGORY_PER_PAGE = 1

const Category = () => {
  const { userInfo } = useAuth()
  const { darkTheme } = useDarkTheme()
  const [categoryList, setCategoryList] = useState([])
  const [filter, setFilter] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMore = async () => {
    try {
      const nextRef = query(
        collection(db, 'categories'),
        startAfter(lastDoc),
        limit(CATEGORY_PER_PAGE)
      )
      onSnapshot(nextRef, (snapshot) => {
        // console.log(snapshot.size)
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setCategoryList([...categoryList, ...results])
      })
      const documentSnapshots = await getDocs(nextRef)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      setLastDoc(lastVisible)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const colRef = collection(db, 'categories')
        const newRef = filter
          ? query(colRef, where('name', '>=', filter), where('name', '<=', filter + 'utf8'))
          : query(colRef, limit(4))

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
          setCategoryList(results)
        })
        setLastDoc(lastVisible)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategoryData()
  }, [filter])

  if (userInfo.role !== userRole.ADMIN) return <NotFoundPage></NotFoundPage>

  return (
    <CategoryStyles>
      <Content title="Categories" desc="Here is our categories"></Content>
      <div className="utilities">
        <div className="flex gap-10 w-full">
          <Link to={PATH.dashboard.add_category}>
            <Button type="button">Create category</Button>
          </Link>
          <Search placeholder="Search category..." onChange={handleInputFilter}></Search>
        </div>
      </div>
      <div className={`flex py-2 ${darkTheme ? 'text-white' : ''}`}>
        Total of categories : {total}
      </div>
      <CategoryTable data={categoryList}></CategoryTable>
      {total > categoryList.length && (
        <Button type="button" className="load-more" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </CategoryStyles>
  )
}

export default Category
