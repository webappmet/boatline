import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Panel from "../interface/module/Panel";
import Flex from "../layout/Flex";
import P from "../type/P";

const TicketDetails = ({ ticket }) => {
    const history = useHistory();
    const [color, setColor] = useState('white');

    const handleClick = () => {
        history.push(`/tickets?r=${ticket.reference}`)
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
                    <P>1x {ticket.cabins[0].type} -{ticket.cabins[0].id}</P>
                    <P>Ref: <Span>{ticket.reference}</Span></P>
                </Flex>
            </Panel>
        </div>
    );
}

const Span = styled.span`
    color: dark-orange;
    font-weight: bold;
`

export default TicketDetails;