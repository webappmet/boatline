import './styled.css';
import Cabin from './Cabin';

const Travelers = ({ cabins, selectedCabins, travelers, setTravelers}) => {

    const addTraveler = (id) => {
        let updatedTravelers = [...travelers];
        updatedTravelers.push({
            room: id,
            firstName: '',
            validFirstName: false,
            lastName: '',
            validLastName: false,
            phone: '',
            validPhone: false,
            email: '',
            validEmail: false,
            address: '',
            validAddress: false,
            zip: '',
            validZip: false,
            valid: false
        });
        setTravelers(updatedTravelers);
    }

    return (
        <div className="travelers-container">
            <h3 className="cabin-heading">Fill each cabin with travelers</h3>
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