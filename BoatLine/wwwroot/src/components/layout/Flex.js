import styled from 'styled-components';

const Flex = ({ children, gap, align }) => {
    return (
        <Styled
            style={{
                '--gap': gap || '1.8rem',
                '--alignment' : align || 'initial'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: flex;
    align-items: var(--alignment);
    gap: var(--gap);
    justify-content: space-between;
    flex-wrap: wrap;
`

export default Flex;