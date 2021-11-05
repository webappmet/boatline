import { useEffect, useState } from "react";
import Departure from "../components/content/Departure";
import { getDeparturesByDateAndRoute } from '../api/departures';
import { useHistory } from 'react-router';
import Stack from '../components/layout/Stack';
import Input from '../components/interface/control/Input';
import List from '../components/layout/List';
import Space from '../components/layout/Space';
import RouteSelector from "./RouteSelector";

const DepartureList = ({ setSelectedDeparture, futureOnly = false, items = 10, navigable = true, routeFilter = true, dateFilter = true }) => {
    const history = useHistory();
    const [selectedRoute, setSelectedRoute] = useState('All');
    const [date, setDate] = useState('')
    const [dateValid, setDateValid] = useState(false)
    const [departures, setDepartures] = useState([]);

    const fetchDepartures = async () => {
        const departures = await getDeparturesByDateAndRoute({ date: dateValid ? date : '', route: typeof selectedRoute == 'string' ? null : selectedRoute.id })
        if (departures) setDepartures(departures);
    }

    const filterRoute = (route) => {
        setSelectedRoute(route)
    }

    const filterDate = (date) => {
        if (!date) return
        setDate(date);
        let valid = date.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) ? true : false;
        if (futureOnly) {
            let year = parseInt(date.substring(0,4));
            let month = parseInt(date.substring(5,7));
            let day = parseInt(date.substring(8,10));
            let today = new Date();

            if (year === today.getFullYear()) {
                if (month === today.getUTCMonth() + 1) {
                    if (day < today.getUTCDate()) {
                        valid = false;
                    }
                }
                else if (month < today.getUTCMonth() + 1) {
                    valid = false;
                }
            }
            else if (year < today.getFullYear()) {
                valid = false;
            }
            if (valid) setDateValid(true);
            else setDateValid(false);
            return valid ? true : 'Must be a date set in the future';
        }
        else if (valid) {
            setDateValid(true)
        }
        else setDateValid(false)
    }

    const selectDeparture = (departure) => {
        if (typeof setSelectedDeparture == 'function') setSelectedDeparture(departure);
    }

    useEffect(() => {
        fetchDepartures()
    }, [selectedRoute, date, dateValid])

    useEffect(() => {
        if (routeFilter && routeFilter !== true) setSelectedRoute(routeFilter)
        if (dateFilter && dateFilter !== true) setDate(dateFilter)
    }, [routeFilter, dateFilter])

    return (
        <Stack>
            <Space>
                {dateFilter === true ? 
                    <Input id="departure-date-filter" value={date} type="date" label="Filter date" validator={filterDate}/> :
                    ''
                }
                {routeFilter === true ?
                    <RouteSelector route={selectedRoute} setRoute={filterRoute} id="filter-route-select" label="Filter route" all={true}/> :
                    ''
                }
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