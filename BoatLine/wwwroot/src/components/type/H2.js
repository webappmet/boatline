import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H2 = ({ children, weight }) => {
    return (
        <Styled
            style={{
                '--h2-font-weight' : weight || 'bold'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.h2`
    ${Type}
    font-size: 2rem;
    font-weight: var(--h2-font-weight);
`;

export default H2;