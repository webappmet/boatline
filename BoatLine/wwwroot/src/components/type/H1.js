import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H1 = ({ children, size }) => {
    return (
        <Styled
            style={{
                '--h1-font-size': size || '3rem'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.h1`
    ${Type}
    font-size: var(--h1-font-size);
`;

export default H1;