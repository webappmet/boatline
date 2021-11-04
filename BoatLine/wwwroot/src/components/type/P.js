import styled from "styled-components";
import Type from '../../assets/styles/scoped/Type';

const P = ({ children }) => {
    return (
        <Styled>{children}</Styled>
    );
}

const Styled = styled.p`
    ${Type}
    font-size: 1.6rem;
`;

export default P;