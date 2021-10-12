import Traveler from "./Traveler";
import { useEffect,useState } from "react";

const Cabin = ({ travelers, addTraveler, cabin, setTravelers }) => {

    const [occupiedBeds, setOccupiedBeds] = useState();
    
    useEffect(() => {
        let occupied = travelers.reduce((acc, traveler) => traveler.room == cabin.id ? acc + 1 : acc, 0);
        setOccupiedBeds(occupied);
    }, [travelers])

    const updateTraveler = (index, newTraveler) => {
        const updatedTravelers = [...travelers];
        updatedTravelers[index] = newTraveler;
        setTravelers(updatedTravelers);
    }

    const removeTraveler = (index) => {
        const updatedTravelers = [...travelers];
        updatedTravelers.splice(index, 1);
        setTravelers(updatedTravelers);
    }

    return (
        <div className="cabin-travelers">
            <div className="cabin-side">
                <div className="cabin-side-group">
                    <p><span className="bold">Room:</span> {cabin.id} - {cabin.type}</p>
                    <p><span className="bold">Beds Occupied:</span> {occupiedBeds} / {cabin.beds}</p>
                </div>
            </div>
            <div className="travelers">
                {travelers.map((traveler, index) => {
                    return (
                        <div key={index}>
                            {traveler.room == cabin.id ? 
                            <Traveler index={index} updateTraveler={updateTraveler} person={index + 1} traveler={traveler} removeSelf={removeTraveler} /> :
                            ''}
                        </div>
                    );
                })}
                <button disabled={occupiedBeds === cabin.beds ? true : false} type="button" onClick={() => addTraveler(cabin.id)} className="add-traveler">+ Add Traveler {occupiedBeds === cabin.beds ? '(full)': ''}</button>
            </div>
        </div>
    );
}

export default Cabin;