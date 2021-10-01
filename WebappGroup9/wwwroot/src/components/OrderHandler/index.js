import { useState, useEffect } from 'react';
import { getRoutes } from '../../api/api';

import Walker from "../Walker";
import Route from "./Route";

const OrderHandler = () => {

    const [message, setMessage] = useState('');

    const [routes, setRoutes] = useState([]);
    const [departure, setDeparture] = useState();
    const [destination, setDestination] = useState();

    const fetchRoutes = async () => {
        try {
            const routes = await getRoutes();
            console.log(routes)
            setDeparture(routes[0][0])
            setRoutes(routes);
        }
        catch (e) {
            setRoutes([]);
            setMessage("Could not load routes")
        }
    }

    useEffect(() => {
        fetchRoutes();
    }, [])

    const confirm = () => {
        return "Thank you for ordering"
    }

    return (
        <Walker title="Bestill billett" message={message} setMessage={setMessage} confirm={confirm} message={message}>
            <Route routes={routes} setDeparture={setDeparture} setDestination={setDestination} destination={destination} departure={departure} />
            <span>hi there everybody</span>
        </Walker>
    );
}

export default OrderHandler;