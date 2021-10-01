import './styled.css';

const CabinSelect = () => {
    
}

const Cabin = ({ cabins }) => {

    const addCabin = () => {

    }

    return (
        <div>
            <h3 className="cabin-heading">Select the cabins you want to reserve</h3>
            <div className="cabin-total">

            </div>
            <div>
                <ul className="cabin-list">
                    
                </ul>
                <button onClick={addCabin}>Add cabin</button>
            </div>
        </div>
    );
}

export default Cabin;