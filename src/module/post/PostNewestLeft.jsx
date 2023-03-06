import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import PostTitle from "module/post/PostTitle";
import styled from "styled-components";

const PostNewestLeftStyles = styled.div`
    .post{
        &-image{
            height: 430px;
            margin-bottom: 12px;
        }
        &-category{
            margin-bottom: 12px;
        }
        &-title{
            margin-bottom: 12px;
        }
        &-meta{
            font-size: calc(0.5em + 0.5vw);
            margin-bottom: 12px;
        }
    }
    @media (max-width: 540px){
        .post{
            &-category{
                font-size: 15px;
            }
            &-meta{
                font-size: 13px;
            }
        }
    }
    @media (max-width: 1024px){
        .post{
            &-image{
                height: min(520px, 100vh);
                width: fit-content;
            }
            &-category{
                font-size: 15px;
            }
            &-meta{
                font-size: 13px;
            }
        }
    }
`;
const PostNewestLeft = () => {
    return (
        <PostNewestLeftStyles className="newest-left">
            <PostImage
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHdvcmtzcGFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            >
            </PostImage>
            <PostCategory>Kiến thức</PostCategory>
            <PostTitle>
                10 Best Things To Do When You Are Bored In Lockdown
            </PostTitle>
            <PostMeta
                color="#A0A0A0"
            >
            </PostMeta>
        </PostNewestLeftStyles>
    )
}

export default PostNewestLeft;