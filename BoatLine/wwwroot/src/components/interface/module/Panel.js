import styled from 'styled-components';

const Panel = ({ children, color, cursor, padding, radius, border }) => {
    return (
        <Styled
            style={{
                '--color' : color || 'var(--color-gl)',
                '--padding' : padding || '1.8rem',
                '--radius' : radius || '.3rem',
                '--border' : border || 'none',
                '--cursor' : cursor || 'initial',
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    transition: all .2s linear;
    background-color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
    border: var(--border);
    cursor: var(--cursor);
`;

export default Panel;