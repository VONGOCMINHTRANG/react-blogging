import { useAuth } from 'contexts/auth-context'
import { db } from '../firebase/firebase-config'
import { addDoc, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'

export default function useFavourite() {
  const { userInfo } = useAuth()
  const [favouritePosts, setFavouritePosts] = useState([])

  const handleFavouritePost = async (item) => {
    const isLiked = favouritePosts.some((favoritePost) => favoritePost.title === item.title)

    if (isLiked) {
      // Nếu đã like, thực hiện bỏ like bằng cách loại bỏ title khỏi mảng selectedArray
      const updatedArray = favouritePosts.filter(
        (favouritePost) => favouritePost.title !== item.title
      )

      setFavouritePosts(updatedArray)
    } else {
      // Nếu chưa like, thêm title vào mảng selectedArray

      setFavouritePosts([...favouritePosts, item])
    }
  }

  return {
    handleFavouritePost,
    favouritePosts,
  }
}
