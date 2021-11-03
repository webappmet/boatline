import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TextLink = ({ to, action, children }) => {

    const handleClick = (e) => {
        e.preventDefault();
        if (action instanceof Function) {
            action()
        }
    }
    
    return (
        <>
            {to ? <Styled to={to}>{children}</Styled> : <A href="#" onClick={handleClick}>{children}</A>}
        </>
    );
}

const A = styled.a`
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
`

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