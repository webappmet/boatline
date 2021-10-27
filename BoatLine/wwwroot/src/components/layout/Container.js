import styled from 'styled-components';

const Container = ({ children, padding, max }) => {
    return (
        <Wrapper
            style={{
                '--padding' : padding,
                '--max' : max
            }}
        >
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: var(--max, 110rem);
    margin: 0 auto;
    padding: var(--padding, 1.8rem);
`;

export default Container;