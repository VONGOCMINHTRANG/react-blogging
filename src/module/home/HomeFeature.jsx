import styled from "styled-components";
import { Button } from "components/button";
import { useNavigate } from "react-router-dom";
import PostFeatureItem from "module/post/PostFeatureItem";
import { Title } from "components/title";

const HomeFeatureStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 4em;

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

`;

const HomeFeature = () => {
    const navigate = useNavigate();

    return (
        <HomeFeatureStyles>
            <div className="container">
                <div className="content">
                    <Title>Feature</Title>
                    <Button
                        type="button"
                        className="view-all"
                        onClick={() => navigate("/blog")}
                    >
                        View all
                    </Button>
                </div>
                <div className="grid-layout">
                    <PostFeatureItem></PostFeatureItem>
                </div>
            </div>
        </HomeFeatureStyles>
    )
}

export default HomeFeature;