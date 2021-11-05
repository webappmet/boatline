import { useState } from "react/cjs/react.development";
import { postRoute } from "../api/routes";
import Button, { Text as ButtonText } from "../components/interface/control/Button";
import Input from "../components/interface/control/Input";
import Align from "../components/layout/Align";
import Space from "../components/layout/Space";
import Stack from "../components/layout/Stack";
import { useToastDispatch } from "../context/toast";

const CreateRoute = ({ submit }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [validDestination, setValidDestination] = useState('');
    const [durationDays, setDurationDays] = useState('');
    const [durationHours, setDurationHours] = useState('');
    const [validDurationHours, setValidDurationHours] = useState('');

    const toastDispatch = useToastDispatch();

    const departureValidator = (value) => {
        setDeparture(value)
        return true
    }

    const destinationValidator = (value) => {
        setDestination(value)
        if (departure !== value) {
            setValidDestination(true)
            return true
        }
        else {
            setValidDestination(false)
            return 'Departure and destination must differ';
        }
    }

    const durationDaysValidator = (value) => {
        setDurationDays(value)
        return true
    }

    const durationHoursValidator = (value) => {
        setDurationHours(value)
        if (value >= 0 && value < 24) {
            setValidDurationHours(true)
            return true
        }
        else {
            setValidDurationHours(false)
            return 'Hours must be between 0 and 23'
        }
    }

    const doCreateRoute = async () => {
        const res = await postRoute({ departure, destination, durationDays, durationHours });
        if (res) {
            setDeparture('')
            setDestination('')
            setDurationDays('')
            setDurationHours('')
            toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Added Route', timer: 3000 } })
            setTimeout(submit, 100);
        }
        else toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Could not add route', timer: 4000 } })
    }

    const createRoute = () => {
        doCreateRoute()
    }

    return (
        <Stack>
            <Space>
                <Input value={departure} id="create-route-departre" label="Departure" type="text" validator={departureValidator} />
                <Input value={destination} id="create-route-destination" label="Destination" type="text" validator={destinationValidator} />
            </Space>
            <Space>
                <Input value={durationDays} id="create-route-days" label="Trip duration days" type="number" validator={durationDaysValidator} />
                <Input value={durationHours} id="create-route-hours" label="Trip duration hours" type="number" validator={durationHoursValidator} />
            </Space>
            <Align align="right">
                <Button disabled={!departure || !validDestination || !durationDays || !validDurationHours} action={createRoute}>
                    <ButtonText>Create Route</ButtonText>
                </Button>
            </Align>
        </Stack>
    );
}

export default CreateRoute;