import { Logout } from 'components/logout'
import { Menu } from 'components/menu'
import { useAuth } from 'contexts/auth-context'
import NotFoundPage from 'pages/NotFoundPage'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { useEffect, useState } from 'react'

const DashboardLayoutStyles = styled.div`
  .dashboard-main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .dashboard-children {
    padding: 0 20px;
    background-color: white;
    width: 100%;
  }
  @media (max-width: 949px) {
    .dashboard-children {
      padding: 20px;
    }
  }
`

const DashboardLayout = ({ children }) => {
  const [creditials, setCreditials] = useState([])
  const { userInfo } = useAuth()
  if (!userInfo) return <NotFoundPage></NotFoundPage>

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (!userInfo?.uid) return null
  //       const docRef = doc(db, 'users', userInfo?.uid)
  //       const docSnap = await getDoc(docRef)
  //       let results = []
  //       if (docSnap.exists()) {
  //         results.push({
  //           role: docSnap.data().role,
  //           status: docSnap.data().status,
  //         })
  //         console.log(results)
  //         setCreditials(results)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchUserData()
  // }, [])

  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Menu></Menu>
        <Logout></Logout>
        <div className="dashboard-children">{children}</div>
      </div>
    </DashboardLayoutStyles>
  )
}

export default DashboardLayout
