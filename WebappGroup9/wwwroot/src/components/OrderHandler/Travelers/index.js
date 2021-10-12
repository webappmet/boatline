import './styled.css';
import { useEffect } from 'react';
import Cabin from './Cabin';

const Travelers = ({ cabins, selectedCabins, travelers, setTravelers}) => {

    const addTraveler = (id) => {
        let updatedTravelers = [...travelers];
        updatedTravelers.push({
            room: id,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            zip: ''
        });
        console.log(updatedTravelers)
        setTravelers(updatedTravelers);
    }

    return (
        <div className="travelers-container">
            {selectedCabins.map((id) => {
                let cabin = cabins.find((cabin) => cabin.id == id);

                return (
                    <Cabin setTravelers={setTravelers} travelers={travelers} key={id} cabin={cabin} addTraveler={addTraveler}/>
                );
            })}
        </div>
    );
}

export default Travelers;