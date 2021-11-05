import styled from 'styled-components';

const Container = ({ children, padding, max }) => {
    return (
        <Wrapper
            style={{
                '--padding' : padding || '1.8rem',
                '--max' : max || '110rem'
            }}
        >
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 var(--padding);
`;

export default Container;