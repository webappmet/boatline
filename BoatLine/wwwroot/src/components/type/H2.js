import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H2 = ({ children }) => {
    return (
        <Styled>{children}</Styled>
    );
}

const Styled = styled.h2`
    ${Type}
    font-size: 2rem;
`;

export default H2;