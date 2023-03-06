import { FiArrowLeftCircle } from "react-icons/fi";
import styled from "styled-components";

const IconArrowLeftStyles = styled.div`
    color: ${props => props.theme.secondary};
`;
const IconArrowLeft = ({onClick = () => {}, className = ''}) => {
    return (
        <IconArrowLeftStyles onClick={onClick}>
            <FiArrowLeftCircle className={className}></FiArrowLeftCircle>
        </IconArrowLeftStyles>

    )
}

export default IconArrowLeft;