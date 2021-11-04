import DepartureForm from "../components/content/DepartureForm";
import { useState } from "react";
import { createDeparture } from "../api/departures";
import { useToastDispatch } from "../context/toast";

const CreateDepartureForm = () => {
    const [route, setRoute] = useState();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const toastDispatch = useToastDispatch();

    const reset = () => {
        setRoute();
        setDate('');
        setTime('');
    }

    const handleCreate = async () => {
        if (route && date && time) {
            const res = await createDeparture({ date, time, routeId: route.id });
            if (res) {
                toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Departure added', timer: 3000 } })
                reset()
            }
            else {
                toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Something went wrong', timer: 3000 } })
            }
        }
    }

    return (
        <DepartureForm
            route={route}
            setRoute={setRoute}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            submit={handleCreate}
            text="Add Departure"
        />
    );
}

export default CreateDepartureForm;