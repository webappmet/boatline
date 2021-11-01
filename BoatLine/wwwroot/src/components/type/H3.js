import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const H3 = ({ children }) => {
    return (
        <Styled>{children}</Styled>
    );
}

const Styled = styled.h3`
    ${Type}
    font-size: 1.8rem;
`;

export default H3;