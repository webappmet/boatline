import styled from 'styled-components';

const Section = ({ color, children, padding }) => {
    return (
        <Styled
            style={{
                '--color' : color,
                '--padding' : padding || '5.6rem'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.section`
    background-color: var(--color);
    padding: var(--padding) 0;
`;

export default Section;