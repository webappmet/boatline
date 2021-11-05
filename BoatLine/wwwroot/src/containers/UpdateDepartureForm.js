import DepartureForm from "../components/content/DepartureForm";
import { useEffect, useState } from "react";
import { updateDeparture } from "../api/departures";
import { useToastDispatch } from "../context/toast";
import { getDeparture } from "../api/departures";
import { useHistory } from "react-router";

const UpdateDepartureForm = ({ id }) => {
    const history = useHistory();
    const [route, setRoute] = useState();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const toastDispatch = useToastDispatch();

    const fetchDeparture = async () => {
        const res = await getDeparture(id);
        console.log(res)
        if (res) {
            setRoute(res.route)
            setDate(res.date)
            setTime(res.time)
        }
        else {
            history.push('/departures')
        }
    }

    const handleUpdate = async () => {
        if (route && date && time) {
            const res = await updateDeparture({ date, time, departureId: id, routeId: route.id });
            if (res) {
                toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Departure updated', timer: 3000 } })
            }
            else {
                toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Could not update departure', timer: 3000 } })
            }
        }
    }

    useEffect(() => {
        fetchDeparture();
    }, [])

    return (
        <DepartureForm 
            route={route}
            setRoute={setRoute}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            submit={handleUpdate}
            text="Update Departure"
        />
    );
}

export default UpdateDepartureForm;