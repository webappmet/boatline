import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Button = ({ size, children, to, action, disabled }) => {
    let history = useHistory();

    const handleClick = () => {
        if (typeof to === 'string') {
            history.push(to);
        }
        else if (action instanceof Function) {
            action()
        }
    }

    return (
        <StyledButton
            style={{
                '--padding' : size === 'large' ? '2.5rem 4rem' : '1rem 2rem'
            }}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    display: grid;
    grid-template-columns: repeat(${props => props.children && props.children.length || 1}, max-content);
    align-items: center;
    gap: 1rem;
    border: none;
    background-color: var(--color-pl);
    color: white;
    border-radius: .3rem;
    padding: var(--padding);
    transition: all .2s linear;

    &:hover {
        background-color: var(--color-p);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    &:active {
        transform: translateY(.05rem);
        box-shadow: none;
    }

    &:disabled {
        background-color: gray;
        transform: translateY(0);
        box-shadow: none;
    }
`;

export const Text = styled.p`
    margin: 0;
    color: white;
`;

export const Icon = styled.div`
    height: 2rem;
    width: 2rem;
    fill: white;
`;

export default Button;