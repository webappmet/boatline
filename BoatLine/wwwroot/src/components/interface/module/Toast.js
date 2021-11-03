import styled from 'styled-components';
import Panel from "./Panel";

const Toast = ({ visible, children }) => {


    return (
        <>
            <Fade visible={visible}>
                <Panel><span>{children}</span></Panel>
            </Fade>
        </>
    );
}

const Fade = styled.div`
    opacity: ${props => props.visible ? '1' : '0'};
    transition: all .3s linear;
`

export default Toast;