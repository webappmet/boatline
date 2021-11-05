import styled from 'styled-components';

const Space = ({ children, breakpoint, col, gap }) => {
    return (
        <Styled
            style={{
                '--columns': col || 2,
                '--gap': gap || '1.8rem'
            }}
            breakpoint={breakpoint || '800px'}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(var(--columns), 1fr);

    @media (max-width: ${props => props.breakpoint}) {
        grid-template-columns: 1fr;
    }
`

export default Space;