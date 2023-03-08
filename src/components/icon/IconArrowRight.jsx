import { FiArrowRightCircle } from "react-icons/fi";
import styled from "styled-components";

const IconArrowRightStyles = styled.div`
    color: ${props => props.theme.secondary};
`;
const IconArrowRight = ({onClick = () => {}, className = ''}) => {
    return (
        <IconArrowRightStyles onClick={onClick}>
            <FiArrowRightCircle className={className}></FiArrowRightCircle>
        </IconArrowRightStyles>

    )
}

export default IconArrowRight;