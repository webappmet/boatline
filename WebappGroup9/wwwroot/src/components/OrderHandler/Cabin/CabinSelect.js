import { useState, useEffect } from 'react'

const CabinSelect = ({ cabins, floor, number, toggle, selectedCabins }) => {

    const [cabinId, setCabinId] = useState();
    const [selected, setSelected] = useState(false);
    const [visibleInfo, setVisibleInfo] = useState(false);
    const [type, setType] = useState('Unknown');
    const [beds, setBeds] = useState('unknown');
    const [price, setPrice] = useState('unknown');

    const [timeoutId, setTimeoutId] = useState();

    useEffect(() => {
        setCabinId(floor + number.toString().padStart(2, '0'));
    }, [floor, number]);

    useEffect(() => {
        if (selectedCabins.includes(cabinId)) setSelected(true);
        else setSelected(false);
    }, [cabinId, selectedCabins])

    const viewCabinInfo = () => {
        let cabin = cabins.find(cabin => cabin.id == cabinId);
        if (cabin) {
            setBeds(cabin.beds);
            setType(cabin.type);
            setPrice(cabin.price);
        }
        else {
            setBeds('unknown');
            setType('Unknown');
            setPrice('unknown');
        }
        let timeout = setTimeout(() => {
            setVisibleInfo(true)
        }, 700);
        setTimeoutId(timeout);
    }

    const hideCabinInfo = (e) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setVisibleInfo(false);
    }

    return (
        <div onMouseEnter={viewCabinInfo} onMouseLeave={hideCabinInfo} className="cabin-container" id={`c${number}`}>
            <button type="button" onClick={() => toggle(cabinId)} className={`cabin ${selected ? 'cabin-select' : ''}`}>{cabinId}</button>
            <div className={`cabin-info ${visibleInfo ? 'cabin-info-visible' : ''}`}>
                <h4 className="cabin-type">{type}</h4>
                <table className="cabin-specs">
                    <tbody>
                        <tr className="cabin-spec-row">
                            <td className="cabin-spec">Status:</td>
                            <td className="spec-cell">{selected ? 'Your cabin' : 'Available'}</td>
                        </tr>
                        <tr>
                            <td className="cabin-spec">Beds:</td>
                            <td>{beds}</td>
                        </tr>
                        <tr>
                            <td className="cabin-spec">Price:</td>
                            <td>{price},-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CabinSelect;