import PostCategory from 'module/post/PostCategory'
import PostImage from 'module/post/PostImage'
import PostMeta from 'module/post/PostMeta'
import PostTitle from 'module/post/PostTitle'
import styled from 'styled-components'
import slugify from 'slugify'
import { useDarkTheme } from 'contexts/theme-context'

const PostNewestLeftStyles = styled.div`
  .post {
    &-image {
      height: 430px;
      margin-bottom: 12px;
    }
    &-category {
      margin-bottom: 12px;
      background-color: rgb(29, 192, 113);
      a {
        color: white;
      }
    }
    &-title {
      margin-bottom: 12px;
    }
    &-title: hover {
      color: ${(props) => props.theme.secondary};
      transition: all 0.1s linear;
    }
    &-meta {
      a: hover {
        color: ${(props) => props.theme.secondary};
        transition: all 0.1s linear;
      }
    }
    &-meta {
      font-size: calc(0.5em + 0.5vw);
      margin-bottom: 12px;
    }
  }
  @media (max-width: 540px) {
    .post {
      &-category {
        font-size: 15px;
      }
      &-meta {
        font-size: 13px;
      }
      &-author {
        font-size: 13px;
      }
    }
  }
  @media (max-width: 1024px) {
    .post {
      &-image {
        height: min(520px, 100vh);
        width: fit-content;
      }
      &-category {
        font-size: 15px;
      }
      &-meta {
        font-size: 13px;
      }
    }
  }
`
const PostNewestLeft = ({ data }) => {
  const { darkTheme } = useDarkTheme()
  const time = data?.createdAt?.seconds ? new Date(data?.createdAt?.seconds * 1000) : new Date()
  const formatDate = new Date(time).toLocaleDateString('vi-VI')

  return (
    <PostNewestLeftStyles className="newest-left">
      <PostImage to={`/detail-post/${data?.slug}`} src={data?.image}></PostImage>
      <PostCategory to={`/category/${slugify(data?.category?.name || '', { lower: true })}`}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={`/detail-post/${data?.slug}`} className={darkTheme ? 'text-white' : ''}>
        {data?.title}
      </PostTitle>
      <PostMeta
        color="#A0A0A0"
        time={formatDate}
        author={data?.user?.fullname}
        to={`/author/${slugify(data?.user?.fullname || '', { lower: true })}`}
      ></PostMeta>
    </PostNewestLeftStyles>
  )
}

export default PostNewestLeft
