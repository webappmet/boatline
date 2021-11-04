import Input from '../interface/control/Input';
import RouteSelector from '../../containers/RouteSelector';
import { useState } from 'react/cjs/react.development';

const DepartureForm = () => {
    const [route, setRoute] = useState()

    return (
        <div>
            <RouteSelector route={route} setRoute={setRoute} id="create-route-select" label="Select route"/>
        </div>
    );
}

export default DepartureForm;