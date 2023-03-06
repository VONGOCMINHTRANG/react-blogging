import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Slider from 'react-slick'
import styled from 'styled-components'
import PostRelatedItem from './PostRelatedItem'

const PostRelatedStyles = styled.div`
  .slick-slide {
    padding: 0 10px;
  }
`

const PostRelated = () => {
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
  return (
    <PostRelatedStyles className="post-related">
      <Slider {...settings}>
        <PostRelatedItem></PostRelatedItem>
        <PostRelatedItem></PostRelatedItem>
        <PostRelatedItem></PostRelatedItem>
        <PostRelatedItem></PostRelatedItem>
      </Slider>
    </PostRelatedStyles>
  )
}

export default PostRelated
