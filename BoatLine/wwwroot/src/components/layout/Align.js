import styled from "styled-components";

const Align = ({ children, align }) => {
    return (
        <Styled
            style={{
                '--alignment' : align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: var(--alignment);
`

export default Align;