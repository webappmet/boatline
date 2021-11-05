import styled from 'styled-components';

const Stack = ({ children, gap }) => {
    return (
        <Styled
            style={{
                '--gap': gap || '1.8rem'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: grid;
    gap: var(--gap);
    grid-template-rows: 1fr;
`

export default Stack;