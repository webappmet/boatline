import styled from 'styled-components';
import { useToastState, useToastDispatch } from '../context/toast';
import { useEffect } from 'react';
import Toast from '../components/interface/module/Toast';

const ToastContainer = () => {
    const toast = useToastState();
    const dispatch = useToastDispatch();

    useEffect(() => {
        if (toast.visible) {
            setTimeout(() => {
                dispatch({ type: "HIDE_MESSAGE" })
            }, toast.timer)
        }
    }, [toast]);

    return (
        <Position>
            <Toast visible={toast.visible}>{toast.message}</Toast>
        </Position>
    );
}

const Position = styled.div`
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
`

export default ToastContainer;