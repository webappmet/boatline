import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H1 = ({ children, size, weight }) => {
    return (
        <Styled
            style={{
                '--h1-font-size': size || '3rem',
                '--h1-font-weight': weight || 'bold'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.h1`
    ${Type}
    font-size: var(--h1-font-size);
    font-weight: var(--h1-font-weight);
`;

export default H1;