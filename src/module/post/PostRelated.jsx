import { db } from '../../firebase/firebase-config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Slider from 'react-slick'
import styled from 'styled-components'
import PostRelatedItem from './PostRelatedItem'
import PropTypes from 'prop-types'

const PostRelatedStyles = styled.div`
  .slick-slide {
    padding: 0 10px;
  }
`

const PostRelated = ({ categoryId = '' }) => {
  const [posts, setPosts] = useState([])

  function NextArrow({ onClick }) {
    return (
      <FiArrowRight
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-10 cursor-pointer text-gray-400 opacity-30"
        onClick={onClick}
      />
    )
  }

  function PrevArrow({ onClick }) {
    return (
      <FiArrowLeft
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-10 cursor-pointer text-gray-400 opacity-30"
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

  useEffect(() => {
    try {
      const docRef = query(collection(db, 'posts'), where('categoryId', '==', categoryId))
      onSnapshot(docRef, (snapshot) => {
        let results = []
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
          console.log(results)
          setPosts(results)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [categoryId])

  return (
    <PostRelatedStyles className="post-related">
      <Slider {...settings}>
        {posts?.length > 0 &&
          posts?.map((post) => <PostRelatedItem post={post} key={post.id}></PostRelatedItem>)}
      </Slider>
    </PostRelatedStyles>
  )
}

PostRelated.propTypes = {
  categoryId: PropTypes.string.isRequired,
}

export default PostRelated
