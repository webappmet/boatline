import './styled.css';

const Nav = () => {
    return (
        <div className="navbar">
            <a className="nav-link" href="/"><h1 className="logo">BoatLine</h1></a>
            <nav className="navigation">
                <ul className="nav-list">
                    <li className="nav-list-item"><a className="nav-link" href="/order">Order</a></li>
                    <li className="nav-list-item"><a className="nav-link" href="/search">Search Ticket</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;