import { useEffect, useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const Cabin = ({ action, number, floor }) => {
    const [id, setId] = useState(0);

    useEffect(() => {
        setId(floor + number.toString().padStart(2, '0'));
    }, [number, floor])

    return (
        <Styled tabIndex={0} onClick={() => action(id)} id={`c${number}`}>{id}</Styled>
    );
}

const Styled = styled.div`
    border: 1px solid gray;
    background-color: lightblue;
    font-size: .8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s linear;

    &:hover {
        background-color: lightcoral;
        cursor: pointer;
    }
`

export default Cabin;