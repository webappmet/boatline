import styled from 'styled-components';

const Panel = ({ children, color, padding, radius, border }) => {
    return (
        <Styled
            style={{
                '--color' : color || 'var(--color-gl)',
                '--padding' : padding || '1.8rem',
                '--radius' : radius || '.3rem',
                '--border' : border || 'none'
            }}
        >{children}</Styled>
    );
}

const Styled = styled.div`
    background-color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
    border: var(--border);
`;

export default Panel;