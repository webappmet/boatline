import styled from 'styled-components';

const Space = ({ children, gap }) => {
    return (
        <Styled
            style={{
                '--gap': gap || '1.8rem'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: flex;
    gap: var(--gap);
    justify-content: space-between;
    flex-wrap: wrap;
`

export default Space;