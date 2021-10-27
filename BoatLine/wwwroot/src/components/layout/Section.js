import styled from 'styled-components';

const Section = ({ color, children, padding }) => {
    return (
        <Styled
            style={{
                '--color' : color,
                '--padding' : padding
            }}
        >{children}</Styled>
    );
}

const Styled = styled.section`
    background-color: var(--color);
    padding: var(--padding, 5.6rem) 0;
`;

export default Section;