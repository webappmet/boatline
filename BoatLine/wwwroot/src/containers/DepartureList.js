import styled from 'styled-components';
import { useEffect, useState } from "react";
import Departure from "../components/content/Departure";
import { getDeparturesByDateAndRoute } from '../api/departures';
import { getRoutes } from '../api/routes';
import { useHistory } from 'react-router';
import Stack from '../components/layout/Stack';
import Align from '../components/layout/Align';
import Select from '../components/interface/control/Select';
import Input from '../components/interface/control/Input';
import List from '../components/layout/List';
import Space from '../components/layout/Space';

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

    const fetchRoutes = async () => {
        const routes = await getRoutes();
        if (routes) {
            routes.unshift('All');
            setRoutes(routes);
        }
    }

    const filterRoutes = (event) => {
        const value = event.target.value;
        const selectedRoute = routes.find((route) => `${route.departure} - ${route.destination}` === value)
        if (selectedRoute) setSelectedRoute(selectedRoute);
        else setSelectedRoute('All')
    }

    const filterDate = (date) => {
        setDate(date)
    }

    useEffect(() => {
        fetchRoutes()
    }, []);

    useEffect(() => {
        fetchDepartures()
    }, [selectedRoute, date, routes])

    return (
        <Stack>
            <Space>
                <Input id="departure-date-filter" value={date} type="date" label="Filter date" validator={filterDate}/>
                <Select changeHandler={filterRoutes} id="route-select" value={typeof selectedRoute == 'string' ? selectedRoute : `${selectedRoute.departure} - ${selectedRoute.destination}`} label="Filter route" name="Filter route" options={routes.map((route) => typeof route == 'string' ? route : `${route.departure} - ${route.destination}`)} />
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