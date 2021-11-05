import Input from '../interface/control/Input';
import RouteSelector from '../../containers/RouteSelector';
import { useState } from 'react/cjs/react.development';
import Space from '../layout/Space';
import Stack from '../layout/Stack';
import Button, { Text as ButtonText } from '../interface/control/Button';
import Align from '../layout/Align';

const DepartureForm = ({ submit, text, route, date, time, setRoute, setDate, setTime }) => {
    return (
        <Stack gap="3rem">
            <Space>
                <RouteSelector route={route} setRoute={setRoute} id="create-route-select" label="Select route"/>
                <Input id="create-departure-date" value={date} type="date" label="Departure date" validator={setDate}/>
                <Input id="create-departure-time" value={time} type="time" label="Departure time" validator={setTime}/>
            </Space>
            <Align align="right">
                <Button disabled={!route || !time || !date} action={() => submit()}>
                    <ButtonText>{text}</ButtonText>
                </Button>
            </Align>
        </Stack>
    );
}

export default DepartureForm;