import styled from 'styled-components';

const Container = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: 100rem;
    margin: 0 auto;
    padding: 1.8rem;
`;

export default Container;