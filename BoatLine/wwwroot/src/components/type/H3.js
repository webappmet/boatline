import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H3 = ({ children, weight, size }) => {
    return (
        <Styled
            style={{
                '--h3-font-size' : size || '1.8rem',
                '--h3-font-weight' : weight || 'bold'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.h3`
    ${Type}
    font-size: var(--h3-font-size);
    font-weight: var(--h3-font-weight);
`;

export default H3;