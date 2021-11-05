import { getTickets } from "../api/tickets";
import { useEffect } from "react/cjs/react.development";
import List from "../components/layout/List";
import P from '../components/type/P';
import { useState } from "react";
import TicketDetails from '../components/content/TicketDetails';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        const tickets = await getTickets();
        if (tickets) setTickets(tickets);
    }

    useEffect(() => {
        fetchTickets();
    }, [])

    return (
        <List count={7}>
            {tickets.length === 0 ? <P>No tickets sold yet</P> : ''}
            {tickets.map((ticket, index) => {
                return (
                    <TicketDetails key={index} ticket={ticket} />
                );
            })}
        </List>
    );
}

export default TicketList;