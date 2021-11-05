import styled from 'styled-components';

const Message = ({ visible, type, children }) => {
    return (
        <>
            {visible ? (<Styled className={type}>{children}</Styled>) : <></> }
        </>
    );
}

const Styled = styled.span`
    color: var(--color-tb);
    
    &.error {
        color: var(--color-error-d);
    }

    &.warning {

    }

    &.success {

    }
`;

export default Message;