import { useState, useEffect } from 'react/cjs/react.development';
import { getRoutes } from '../api/routes';
import Select from '../components/interface/control/Select';

const RouteSelector = ({ id, label, route, setRoute, all = false }) => {
    const [routes, setRoutes] = useState(['All']);    

    const fetchRoutes = async () => {
        const routes = await getRoutes();
        if (routes) {
            if (all) routes.unshift('All');
            setRoutes(routes);
        }
    }

    const filterRoutes = (event) => {
        const value = event.target.value;
        const route = routes.find((route) => `${route.departure} - ${route.destination}` === value)
        if (route) setRoute(route);
        else setRoute('All')
    }

    useEffect(() => {
        fetchRoutes()
    }, []);

    return (
        <Select 
            changeHandler={filterRoutes} 
            id={id} 
            value={
                typeof route == 'string' ? 
                route : 
                `${route && route.departure} - ${route && route.destination}`} 
            label={label}
            name={label}
            options={routes.map((route) => typeof route == 'string' ? 
            route : 
            `${route.departure} - ${route.destination}`)} 
        />
    );
}

export default RouteSelector;