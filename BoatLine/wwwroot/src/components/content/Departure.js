import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Panel from "../interface/module/Panel";
import Flex from "../layout/Flex";
import P from "../type/P";

const Departure = ({ departure }) => {
    const history = useHistory();
    const [color, setColor] = useState('white');

    const handleClick = () => {
        history.push(`/departures/${departure.id}`)
    }

    const handleMouseEnter = () => {
        setColor('var(--color-gw)')
    }

    const handleMouseLeave = () => {
        setColor('white')
    }

    return (
        <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Panel cursor="pointer" color={color} radius=".5rem" border="1px solid var(--color-gl)" padding="1rem">
                <Flex>
                    <P>{departure.route.departure} - {departure.route.destination}</P>
                    <P>{departure.date} -<Span> {departure.time}</Span></P>
                </Flex>
            </Panel>
        </div>
    );
}

const Span = styled.span`
    color: dark-orange;
    font-weight: bold;
`


export default Departure;