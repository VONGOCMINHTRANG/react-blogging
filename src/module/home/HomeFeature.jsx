import styled from 'styled-components'
import { Button } from 'components/button'
import { useNavigate } from 'react-router-dom'
import PostFeatureItem from 'module/post/PostFeatureItem'
import { Title } from 'components/title'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'

const HomeFeatureStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 4em;

    .slick-slide {
        padding: 0 10px;
    }
    .container{
        margin: 0 auto;
        transition: width .1s;
        width: 80vw;
        padding: 0;
    }
    .content{
        display: flex ;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
    }
    .view-all{
        margin-right: 0;
        font-size: 1em;
        color: white
        cursor: pointer;
        position: relative;
        height: 20px;
        background-color: rgb(58, 16, 151);
    }

`

const HomeFeature = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const postsRef = collection(db, 'posts')

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

  useEffect(() => {
    const fetchPostFeatureData = async () => {
      const q = query(postsRef, where('hot', '==', true), where('status', '==', 1), limit(6))
      onSnapshot(q, (snapshot) => {
        let posts = []
        snapshot.docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPosts(posts)
      })
    }

    fetchPostFeatureData()
  }, [])

  return (
    <HomeFeatureStyles>
      <div className="container">
        <div className="content">
          <Title>Feature</Title>
          <Button type="button" className="view-all" onClick={() => navigate('/blog')}>
            View all
          </Button>
        </div>
        <div className="grid-layout">
          <Slider {...settings}>
            {posts.length > 0 &&
              posts.map((post) => <PostFeatureItem key={post.id} data={post}></PostFeatureItem>)}
          </Slider>
        </div>
      </div>
    </HomeFeatureStyles>
  )
}

export default HomeFeature
