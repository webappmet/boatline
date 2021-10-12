import './styled.css';
import React from 'react';
import { ReactComponent as BoatIcon } from '../../../assets/Boat.svg';
import { useState, useEffect } from 'react';

const CabinSelect = ({ floor, number, toggle, selectedCabins }) => {

    const [cabinId, setCabinId] = useState();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setCabinId(floor + number.toString().padStart(2, '0'));
    }, [floor, number]);

    useEffect(() => {
        if (selectedCabins.includes(cabinId)) setSelected(true);
        else setSelected(false);
    }, [cabinId, selectedCabins])

    return (
        <button type="button" onClick={() => toggle(cabinId)} id={`c${number}`} className={`cabin ${selected ? 'cabin-select' : ''}`}>{cabinId}</button>
    );
}

const Cabin = ({ cabins, selectedCabins, setSelectedCabins }) => {

    const [ activeFloor, setActiveFloor] = useState(1);


    const toggleCabbin = (id) => {        
        const updatedCabins = [...selectedCabins];
        if (!updatedCabins.includes(id)) updatedCabins.push(id);
        else updatedCabins.splice(updatedCabins.indexOf(id), 1);
        setSelectedCabins(updatedCabins);
    }

    return (
        <div>
            <h3 className="cabin-heading">Select the cabins you want to reserve</h3>
            <div className="cabin-total">
                {selectedCabins}
            </div>
            <div className="cabin-floor">
                <span className="floor"></span>
                <div className="buttons">
                    <button type="button" onClick={() => setActiveFloor(activeFloor + 1)}>up</button>
                    <button type="button" onClick={() => setActiveFloor(activeFloor - 1)}>down</button>
                </div>
            </div>
            <div className="floor-plan">
                <div className="floor-plan-overlay">
                    {[...Array(26).keys()].map((value) => {
                        return <CabinSelect toggle={toggleCabbin} selectedCabins={selectedCabins} key={value} number={value + 1} floor={activeFloor} />
                    })}            
                </div>
                <div className="floor-plan-background">
                    <BoatIcon />
                </div>
            </div>
        </div>
    );
}

export default Cabin;