import { useEffect, useState } from "react";
import Departure from "../components/content/Departure";
import { getDeparturesByDateAndRoute } from '../api/departures';
import { useHistory } from 'react-router';
import Stack from '../components/layout/Stack';
import Input from '../components/interface/control/Input';
import List from '../components/layout/List';
import Space from '../components/layout/Space';
import RouteSelector from "./RouteSelector";

const DepartureList = ({ items = 10, navigable = true }) => {
    const history = useHistory();
    const [selectedRoute, setSelectedRoute] = useState('All');
    const [date, setDate] = useState('')
    const [routes, setRoutes] = useState(['All']);
    const [departures, setDepartures] = useState([]);

    const fetchDepartures = async () => {
        const departures = await getDeparturesByDateAndRoute({ date, route: typeof selectedRoute == 'string' ? null : selectedRoute.id })
        if (departures) setDepartures(departures);
    }

    const filterDate = (date) => {
        setDate(date)
    }

    useEffect(() => {
        fetchDepartures()
    }, [selectedRoute, date, routes])

    return (
        <Stack>
            <Space>
                <Input id="departure-date-filter" value={date} type="date" label="Filter date" validator={filterDate}/>
                <RouteSelector route={selectedRoute} setRoute={setSelectedRoute} id="filter-route-select" label="Filter route" all={true}/>
            </Space>
            <List count={items} navigable={navigable}>
                {departures.map((departure, index) => {
                    return (
                        <Departure key={index} departure={departure}/>
                    );
                })}
            </List>
        </Stack>
    );
}

export default DepartureList;