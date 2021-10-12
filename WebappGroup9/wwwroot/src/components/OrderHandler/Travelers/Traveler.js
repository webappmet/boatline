import Input from "../../Input";

const Traveler = ({ person, traveler, updateTraveler, index, removeSelf }) => {
    const validator = {
        firstName: (value) => {
            updateTraveler(index, {...traveler, firstName: value});
            return true;
        },
        lastName: (value) => {
            updateTraveler(index, {...traveler, lastName: value});
            return true;
        }, 
        email: (value) => { 
            updateTraveler(index, {...traveler, email: value});
            return true;
        },
        phone: (value) => {
            updateTraveler(index, {...traveler, phone: value});
            return true;
        },
        address: (value) => {
            updateTraveler(index, {...traveler, address: value});
            return true;
        },
        city: (value) => {
            updateTraveler(index, {...traveler, city: value});
            return true;
        },
        zip: (value) => {
            updateTraveler(index, {...traveler, zip: value});
            return true;
        }
    }

    return (
        <div className="traveler-form">
            <div className="traveler-form-heading">
                <h3>Person {person}:</h3>
                <button className="remove-traveler-button" type="button" onClick={() => removeSelf(index)}>X</button>
            </div>
            <div className="grid-2">
                <Input id={`first-name${traveler.id}`} label="First Name" value={traveler.firstName} type="text" validator={validator.firstName}/>
                <Input id={`last-name${traveler.id}`} label="Last Name" value={traveler.lastName} type="text" validator={validator.lastName} />
            </div>
            <div className="grid-2">
                <Input id={`phone${traveler.id}`} label="Phone" value={traveler.phone} type="text" validator={validator.phone} />
                <Input id={`email${traveler.id}`} label="Email" value={traveler.email} type="text" validator={validator.email} />
            </div>
            <div>
                <Input id={`address${traveler.id}`} label="Street Address" value={traveler.address} type="text" validator={validator.address}/>
            </div>
            <div className="grid-70-30">
                <Input id={`city${traveler.id}`} label="City/Proince" value={traveler.city} type="text" validator={validator.city}/>
                <Input id={`zip${traveler.id}`} label="Zip" value={traveler.zip} type="text" validator={validator.zip}/>
            </div>
        </div>
    );
}

export default Traveler;