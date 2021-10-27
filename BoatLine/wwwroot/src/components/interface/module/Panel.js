import styled from 'styled-components';

const Panel = ({ children, color, padding, radius }) => {
    return (
        <Styled
            style={{
                '--color' : color,
                '--padding' : padding,
                '--radius' : radius
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    background-color: var(--color, --color-gl);
    padding: var(--padding, 0);
    border-radius: var(--radius, .3rem);
`;

export default Panel;