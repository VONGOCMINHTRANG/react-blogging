import styled from "styled-components";
import PropTypes from "prop-types";

const LinkStyles = styled.div`
    margin-top: 1em;
    text-align: center;
    width: 100%;
    font-weight: 500;

    .link-name{
        margin: 0 4px;
        color: ${props => props.theme.secondary};
    }
`;

const Link = ({ children, link, name}) => {
    return (
        <LinkStyles>
            {children}
            <a className="link-name" href={link}>{name}</a>
        </LinkStyles>
    )
}

Link.propTypes = {
    children: PropTypes.string,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Link;