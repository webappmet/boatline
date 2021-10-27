import { css } from 'styled-components';

const Interface = css`
    height: 3.16rem;
    border-radius: .3rem;
    border: 1px solid gray;
    padding: 0 .5rem;

    ${props => props.valid === true && 'border-color: var(--color-success-l);'}
    ${props => props.valid === false && 'border-color: var(--color-error);'}
`;

export default Interface;