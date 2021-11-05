import './styled.css';
import React from 'react';
import { ReactComponent as ArrowUp } from '../../../assets/ArrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/ArrowDown.svg';
import { ReactComponent as BoatIcon } from '../../../assets/Boat.svg';
import { useState } from 'react';
import CabinSelect from './CabinSelect'
import SelectedCabin from './SelectedCabin';

const Cabin = ({ cabins, selectedCabins, setSelectedCabins, travelers, setTravelers }) => {

    const [ activeFloor, setActiveFloor] = useState(1);


    const toggleCabbin = (id) => {        
        const updatedCabins = [...selectedCabins];
        if (!updatedCabins.includes(id)) updatedCabins.push(id);
        else {
            updatedCabins.splice(updatedCabins.indexOf(id), 1);
            const updatedTravelers = travelers.filter((traveler) => traveler.room !== id);
            setTravelers(updatedTravelers);
        }
        setSelectedCabins(updatedCabins);
    }

    const floorUp = () => {
        setActiveFloor(Math.min(activeFloor + 1, 3))
    }

    const floorDown = () => {
        setActiveFloor(Math.max(activeFloor - 1, 1))
    }

    return (
        <div>
            <h3 className="cabin-heading">Select the cabins you want to reserve</h3>
            <div className="cabin-floor">
                <div className="floor-buttons">
                    <button className="floor-button" type="button" onClick={floorUp}>
                        <ArrowUp />
                    </button>
                    <button className="floor-button" type="button" onClick={floorDown}>
                        <ArrowDown />
                    </button>
                </div>
                <div className="current-floor">
                    <h2 className="current-floor-text">You are on floor</h2>
                    <h2 className="current-floor-number">{activeFloor} / 3</h2>
                </div>
            </div>
            <div className="floor-plan">
                <div className="floor-plan-overlay">
                    {[...Array(26).keys()].map((value) => {
                        return <CabinSelect cabins={cabins} toggle={toggleCabbin} selectedCabins={selectedCabins} key={value} number={value + 1} floor={activeFloor} />
                    })}            
                </div>
                <div className="floor-plan-background">
                    <BoatIcon />
                </div>
            </div>
            <div className="cabin-total">
                <h2 className="cabin-total-heading">Your selected cabins</h2>
                <div className="cabin-total-list">
                    {selectedCabins.length === 0 ?
                    <p>You haven't selected any cabins yet</p> : 
                    selectedCabins.map((id) => {
                        let cabin = cabins.find(cabin => cabin.id == id);
                        return <SelectedCabin key={id} cabin={cabin} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Cabin;