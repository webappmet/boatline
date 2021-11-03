import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TextLink = ({ to, children }) => {
    return (
        <Styled to={to}>{children}</Styled>
    );
}

const Styled = styled(Link)`
    &:link,
    &:visited {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--color-pl);
    }

    &:hover {
        color: var(--color-p);
        text-decoration: underline;
    }

    &:active {
        color: var(--color-pb)
    }
`;

export default TextLink;