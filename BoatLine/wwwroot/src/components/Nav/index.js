import './styled.css';

import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navbar">
            <Link className="nav-link" to="/"><h1 className="logo">BoatLine</h1></Link>
            <nav className="navigation">
                <ul className="nav-list">
                    <li className="nav-list-item"><Link className="nav-link" to="/order">Order</Link></li>
                    <li className="nav-list-item"><Link className="nav-link" to="/search">Search Ticket</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;