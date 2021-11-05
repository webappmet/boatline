import List from "../components/layout/List";
import { getRoutes, deleteRoute } from '../api/routes';
import { useEffect, useState } from "react/cjs/react.development";
import Route from "../components/content/Route";
import { useToastDispatch } from "../context/toast";

const RouteList = ({ update }) => {
    const [routes, setRoutes] = useState([]);
    const toastDispatch = useToastDispatch();

    const fetchRoutes = async () => {
        const routes = await getRoutes();
        if (routes) setRoutes(routes);
    }

    const removeRoute = async (id) => {
        const res = await deleteRoute(id);
        if (res) {
            toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Deleted route', timer: 3000 }})
            setRoutes(routes.filter((route) => route.id !== id));
        }
        else toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Could not delete route', timer: 4000 }})
    }

    useEffect(() => {
        fetchRoutes();
    }, [update]);

    return (
        <List gap=".5rem">
            {routes.map((route, index) => {
                return (
                    <Route key={index} route={route} remove={removeRoute}/>
                );
            })}
        </List>
    );
}

export default RouteList;