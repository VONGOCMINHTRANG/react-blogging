import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Slider from 'react-slick'
import PostItem from './PostItem'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { Link } from 'react-router-dom'

const PostFeatureItemStyles = styled.div`
  .slick-slide {
    padding: 0 10px;
  }
`
const PostFeatureItem = () => {
  const [postData, setPostData] = useState([])
  function NextArrow({ onClick }) {
    return (
      <FiArrowRight
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-10 cursor-pointer text-gray-400 opacity-50"
        onClick={onClick}
      />
    )
  }

  function PrevArrow({ onClick }) {
    return (
      <FiArrowLeft
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-10 cursor-pointer text-gray-400 opacity-50"
        onClick={onClick}
      />
    )
  }

  const settings = {
    dots: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    lazyLoad: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  }

  const colRef = collection(db, 'posts')

  useEffect(() => {
    const fetchPostFeatureData = async () => {
      const q = query(colRef, where('hot', '==', true), limit(6))
      onSnapshot(q, (snapshot) => {
        let posts = []
        snapshot.docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPostData(posts)
        // console.log(posts)
      })
    }
    fetchPostFeatureData()
  }, [])

  return (
    <PostFeatureItemStyles>
      <Slider {...settings}>
        {postData.length > 0 &&
          postData.map((item) => (
            <Link to="/post/:id" key={item.title}>
              <PostItem src={item.image} title={item.title}></PostItem>
            </Link>
          ))}
      </Slider>
    </PostFeatureItemStyles>
  )
}

export default PostFeatureItem
