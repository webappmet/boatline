import './styled.css';

const Select = ({ name, label, id, options, changeHandler, value }) => {

    const renderOptions = () => {
        if (options && Array.isArray(options)) {
            
        }
    }

    return (
        <div className="form-group">
            <label className="from-label" htmlFor={id}>{label}</label>
            <select value={value} onChange={changeHandler} className="form-select" name={name} id={id}>
                {options ? options.map((value, i) => <option key={i} value={value}>{value}</option>) : null}
            </select>
        </div>  
    );
}

export default Select;