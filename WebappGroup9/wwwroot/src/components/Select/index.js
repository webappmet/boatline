import './styled.css';

const Select = ({ name, label, id, options }) => {
    return (
        <div className="form-group">
            <label className="from-label" htmlFor={id}>{label}</label>
            <select className="form-select" name={name} id={id}>
                {options.map((value, i) => {
                    return <option key={i} value={value}>{value}</option>
                })}
            </select>
        </div>  
    );
}

export default Select;