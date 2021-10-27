import styled from 'styled-components';

const Space = ({ children, col, gap }) => {
    return (
        <Styled
            style={{
                '--columns': col || 2,
                '--gap': gap || '1.8rem'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: grid;
    gap: var(--gap);
    grid-template-rows: repeat(var(--columns), 1fr);
`

export default Space;